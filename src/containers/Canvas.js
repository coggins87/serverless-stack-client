import React, { useState, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import { CompactPicker } from "react-color";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Canvas.css";

export default function Canvas(props) {
  const [color, setColor] = useState("");
  const [drawingName, setName] = useState("");
  const canvas = useRef(null);

  function handleClear(e) {
    e.preventDefault();
    canvas.current.clear();
  }

  function handleUndo(e) {
    e.preventDefault();
    canvas.current.undo();
  }

  return (
    <div className="Canvas">
      {props.fileType === "draw" && (
        <div className="DrawPad">
          <CanvasDraw
            lazyRadius={0}
            brushRadius={8}
            brushColor={color.hex}
            canvasWidth="100%"
            ref={canvas}
          />
          <div className="DrawSideBar">
            <div id="edit">
              <CompactPicker onChangeComplete={setColor} />
              <Button onClick={handleUndo}>Undo</Button>

              <Button onClick={handleClear}>Clear</Button>
            </div>
            <div id="save">
              <form>
                <ControlLabel>Name Your Drawing</ControlLabel>
                <FormGroup controlId="content">
                  <FormControl
                    name="drawing"
                    value={drawingName}
                    componentClass="input"
                    type="text"
                    onChange={e => setName(e.target.value)}
                  />
                </FormGroup>
              </form>
              <Button
                bsStyle="primary"
                onClick={e =>
                  props.handleSaveDrawing(e, canvas, drawingName, props.file)
                }
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
