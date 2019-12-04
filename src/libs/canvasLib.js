

export default function handleSaveDrawing(e, canvas, name = null, file) {
  e.preventDefault();
 
  const canvasUrl = canvas.current.canvas.drawing.toDataURL("image/png");
  const blobCanvas = dataURItoBlob(canvasUrl);
  blobCanvas.name = !name ? `${blobCanvas.size}_canvas.png` : `${name}.png`;
  file.current = blobCanvas;
  alert("Drawing Created! Click Create To Save Your Note");

  //fn takes URL, then decodes from base64, then makes an array of charcodes, then creates an array of 8bit unsigned integers, and
//makes a new blob that acts as a readable file, which can be uploaded to S3
//source-stack overflow
function dataURItoBlob(dataURI) {
  var binary = atob(dataURI.split(",")[1]);
  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: "image/png" });
}
}
