chrome.runtime.sendMessage({ order: "drag_start" });

let startX, startY;

const dragBox = document.createElement("div");
dragBox.classList.add("drag-box");
dragBox.style.border = "2px dashed red";
dragBox.style.position = "absolute";
dragBox.style.zIndex = "1000";

document.addEventListener("mousedown", (e) => {
  let dragging = true;
  startX = e.clientX;
  startY = e.clientY;

  dragBox.style.left = startX + "px";
  dragBox.style.top = startY + "px";
  document.body.appendChild(dragBox);

  document.addEventListener("mousemove", (e) => {
    if (dragging) {
      const currentX = e.clientX;
      const currentY = e.clientY;

      const left = Math.min(startX, currentX);
      const top = Math.min(startY, currentY);
      const width = Math.abs(currentX - startX);
      const height = Math.abs(currentY - startY);

      dragBox.style.left = left + "px";
      dragBox.style.top = top + "px";
      dragBox.style.width = width + "px";
      dragBox.style.height = height + "px";
    }
  });

  document.addEventListener("mouseup", (e) => {
    dragging = false;
    const endX = e.clientX;
    const endY = e.clientY;

    chrome.runtime.sendMessage({
      order: "message",
      message: [startX, startY, endX, endY],
    });
    captureAndSaveImage();
  });
});

function captureAndSaveImage() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  origin_img = document.getElementById("capture_origin");

  const width = parseInt(dragBox.style.width, 10) / window.innerWidth;
  const height = parseInt(dragBox.style.height, 10) / window.innerHeight;

  canvas.width = width * origin_img.width;
  canvas.height = height * origin_img.height;

  ctx.drawImage(
    origin_img,
    (parseInt(dragBox.style.left, 10) / window.innerWidth) * origin_img.width,
    (parseInt(dragBox.style.top, 10) / window.innerHeight) * origin_img.height,
    width * origin_img.width,
    height * origin_img.height,
    0,
    0,
    width * origin_img.width,
    height * origin_img.height
  );

  const croppedImageUrl = canvas.toDataURL("image/png");

  const downloadLink = document.createElement("a");
  downloadLink.download = "cropped_image.png";
  downloadLink.href = canvas.toDataURL("image/png");
  downloadLink.click();

  // chrome.runtime.sendMessage({ order: "message", message: croppedImageUrl });
}