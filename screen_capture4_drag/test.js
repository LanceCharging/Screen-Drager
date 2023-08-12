const imageUrl = "YOUR_IMAGE_DATA_URL_HERE";
const img = new Image();
img.src = imageUrl;

img.onload = function () {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  document.body.appendChild(canvas);

  let isDragging = false;
  let startX, startY, endX, endY;

  canvas.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    endX = e.clientX;
    endY = e.clientY;

    // Clear the canvas and draw the selected area
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.strokeRect(startX, startY, endX - startX, endY - startY);
  });

  canvas.addEventListener("mouseup", () => {
    isDragging = false;

    // Capture the selected area's image data
    const selectedImageData = ctx.getImageData(
      startX,
      startY,
      endX - startX,
      endY - startY
    );

    // Create a new canvas and display the selected area's image data
    const selectedCanvas = document.createElement("canvas");
    selectedCanvas.width = selectedImageData.width;
    selectedCanvas.height = selectedImageData.height;
    const selectedCtx = selectedCanvas.getContext("2d");
    selectedCtx.putImageData(selectedImageData, 0, 0);

    document.body.appendChild(selectedCanvas);
  });
};
