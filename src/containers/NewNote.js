import React, { useRef, useState, Fragment } from "react";
import { Radio, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { API } from "aws-amplify";
import "./NewNote.css";
import { s3Upload } from "../libs/awsLib";
import Canvas from "./Canvas";


export default function NewNote(props) {
  const file = useRef(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileType, setFileType] = useState("");

  function validateForm() {
    return content.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }
  function handleSaveDrawing(e, canvas, name=null){
    e.preventDefault()
    let canvasUrl = canvas.current.canvas.drawing.toDataURL("image/jpeg")
    let blobCanvas = dataURItoBlob(canvasUrl)
    blobCanvas.name = !name ? `${blobCanvas.size}_canvas.JPG` : `${name}.JPG`
    file.current = blobCanvas
    alert("Drawing Created! Click Create To Save Your Note")
    }
//fn takes URL, then decodes from base64, then makes an array of charcodes, then creates an array of 8bit unsigned integers, and 
//makes a new blob that acts as a readable file, which can be uploaded to S3
//source-stack overflow
    function dataURItoBlob(dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var array = [];
      for(var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type: 'image/png'});
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      const attachment = file.current ? await s3Upload(file.current) : null;

      await createNote({ content, attachment });
      alert("Note created successfully!");
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function createNote(note) {
    return API.post("notes", "/notes", {
      body: note
    });
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="content">
          <FormControl
            value={content}
            componentClass="textarea"
            onChange={e => setContent(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="file">
          <FormGroup>
            <Radio
              name="file"
              inline
              value="attach"
              onClick={e => setFileType(e.target.value)}
            >
              Attach File
            </Radio>{" "}
            <Radio
              name="file"
              inline
              value="draw"
              onClick={e => setFileType(e.target.value)}
            >
              Draw and Upload Image
            </Radio>{" "}
          </FormGroup>
          {fileType === "attach" ? (
            <Fragment>
              <ControlLabel>Attachment</ControlLabel>
              <FormControl onChange={handleFileChange} type="file" />
            </Fragment>
          ) : (
            <Canvas handleSaveDrawing={handleSaveDrawing} fileType={fileType} fileSource="" file={file}/>
          )}
        </FormGroup>
        <LoaderButton
          block
          id="create"
          type="submit"
          bsSize="large"
          bsStyle="success"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}
