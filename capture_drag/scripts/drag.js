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
    captureAndSaveImage(startX, startY, endX, endY);
  });
});

function captureAndSaveImage(startX, startY, endX, endY) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  origin_img = document.getElementById("capture_origin");

  const origin_width = parseInt(
    document.getElementById("origin-width").textContent
  );
  const origin_height = parseInt(
    document.getElementById("origin-height").textContent
  );

  const width_marginity = Math.abs(endX - startX) / window.innerWidth;
  const height_marginity = Math.abs(endY - startY) / window.innerHeight;

  canvas.width = width_marginity * origin_width;
  canvas.height = height_marginity * origin_height;

  const left_marginity = Math.min(startX, endX) / window.innerWidth;
  const top_marginity = Math.min(startY, endY) / window.innerHeight;

  ctx.drawImage(
    origin_img,
    left_marginity * origin_width,
    top_marginity * origin_height,
    canvas.width,
    canvas.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  const croppedImageUrl = canvas.toDataURL("image/png");

  const downloadLink = document.createElement("a");
  downloadLink.download = "cropped_image.png";
  downloadLink.href = canvas.toDataURL("image/png");
  downloadLink.click();

  // const downloadLink2 = document.createElement("a");
  // downloadLink2.download = "original_image.png";
  // downloadLink2.href = origin_img.src;
  // downloadLink2.click();

  // chrome.runtime.sendMessage({ order: "message", message: croppedImageUrl });
}
