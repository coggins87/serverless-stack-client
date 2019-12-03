import React, { useState, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import { CompactPicker } from "react-color";
import { Button } from 'react-bootstrap'
import "./Canvas.css";

export default function Canvas(props) {
const [color, setColor] = useState("")
const canvas = useRef(null)

function handleClear(e){
  e.preventDefault()
canvas.current.clear()
}

function handleUndo(e){
  e.preventDefault()
  canvas.current.undo()
}

function handleSaveDrawing(e){
e.preventDefault()
canvas.toBlob()
}
return (
    <div className="Canvas">
      {props.fileType === "draw" && (
        <div className="DrawPad">
          <CanvasDraw 
          lazyRadius="10"
          brushRadius="10"
          brushColor={color.hex}
          canvasWidth="65%"
          ref={canvas}

          />
          <div className="DrawSideBar">
            <div id="edit">
          <CompactPicker onChangeComplete={setColor}/>
          <Button onClick={handleUndo}>Undo</Button>

          <Button onClick={handleClear}>Clear</Button>
        </div>
        <div id="save">
        <Button onClick={handleSaveDrawing}>Save</Button>
        </div>
        </div>
        </div>
      )}
    </div>
  );
}
