import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { ButtonToolbar, Alert, FormControl, FormGroup, ControlLabel } from "react-bootstrap";
import config from "../config";
import { s3Upload, s3Delete } from "../libs/awsLib";
import LoaderButton from "../components/LoaderButton";
import Canvas from "./Canvas.js";
import handleSaveDrawing from '../libs/canvasLib'
export default function Notes(props) {
  const file = useRef(null);
  const [note, setNote] = useState(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [canvas, setCanvas] = useState(false);

  useEffect(() => {
    function loadNote() {
      return API.get("notes", `/notes/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const note = await loadNote();
        const { content, attachment } = note;
        if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment);
        }
        setContent(content);
        setNote(note);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return content.length > 0;
  }

  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  function saveNote(note) {
    return API.put("notes", `/notes/${props.match.params.id}`, {
      body: note
    });
  }



  async function handleSubmit(event) {
    let attachment;

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
      if (file.current) {
        await s3Delete(note.attachment);
        attachment = await s3Upload(file.current);
      }
      await saveNote({
        content,
        attachment: attachment || note.attachment
      });
      alert("Successfully updated your note!");
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  function deleteNote() {
    return API.del("notes", `/notes/${props.match.params.id}`);
  }
  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteNote();
      await s3Delete(note.attachment);
      props.history.push("/");
      alert("Note Deleted!");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }

  return (
    <div className="Notes">
      {note && (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              value={content}
              componentClass="textarea"
              onChange={e => setContent(e.target.value)}
            />
          </FormGroup>
          {note.attachment && (
            <FormGroup>
              <ControlLabel>Attachment</ControlLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={note.attachmentURL}
                >
                  {formatFilename(note.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>
          )}
          <FormGroup controlId="file">
            {!note.attachment && <ControlLabel>Attachment</ControlLabel>}
            <FormControl onChange={handleFileChange} type="file" />
          </FormGroup>
          <div className="buttons">
            <ButtonToolbar>
          <LoaderButton
            className="save-delete-edit ml-3"
            type="submit"
            bsSize="large"
            bsStyle="success"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            className="save-delete-edit ml-3"
            bsSize="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
          <LoaderButton
            className="save-delete-edit ml-3"
            bsSize="large"
            bsStyle="primary"
            onClick={()=>{setCanvas(!canvas)}}
          >
            {!canvas ? 'Draw' : 'Cancel Draw'}
          </LoaderButton>
          </ButtonToolbar>
          </div>
        </form>
      )}
      {canvas && (<>
        <Alert bsStyle="danger">This Will Overwrite Your Current Drawing or File!</Alert>

        <Canvas
          handleSaveDrawing={handleSaveDrawing}
          fileType="draw"
          file={file}
        /></>
      )}
    </div>
  );
}
