chrome.runtime.sendMessage({ order: "drag_start" });

let X1, Y1, X2, Y2;
let isMouseDown = false;

document.addEventListener("mousedown", (e1) => {
  chrome.runtime.sendMessage({ order: "message", message: "mousedown" });
  isMouseDown = true;
  X1 = e1.clientX;
  Y1 = e1.clientY;
});

document.addEventListener("mousemove", (e3) => {
  chrome.runtime.sendMessage({ order: "message", message: "mousemove" });
  if (isMouseDown) {
    X2 = e3.clientX;
    Y2 = e3.clientY;
  }
  chrome.runtime.sendMessage({
    order: "message",
    message: [X1, Y1, X2, Y2, isMouseDown],
  });
});

document.addEventListener("mouseup", (e2) => {
  chrome.runtime.sendMessage({ order: "message", message: "mouseup" });
  isMouseDown = false;
  X2 = e2.clientX;
  Y2 = e2.clientY;

  chrome.runtime.sendMessage({ order: "message", message: [X1, Y1, X2, Y2] });

  sliceAfterDrag(X1, Y1, X2, Y2);
  chrome.runtime.sendMessage({ order: "message", message: "End" });
});

function sliceAfterDrag(X1, Y1, X2, Y2) {
  chrome.runtime.sendMessage({
    order: "message",
    message: [X1, Y1, X2, Y2, "sliceAfterDrag-start"],
  });
  const imageSelector = ".capture_origin";
  const imgElement = document.querySelector(imageSelector);

  if (imgElement) {
    chrome.runtime.sendMessage({
      order: "message",
      message: "imgElement == true",
    });
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const width = Math.abs(X2 - X1);
    const height = Math.abs(Y2 - Y1);

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(imgElement, X1, Y1, width, height, 0, 0, width, height);

    const croppedImageUrl = canvas.toDataURL("image/png");

    const croppedImgElement = document.createElement("img");
    croppedImgElement.src = croppedImageUrl;
    croppedImgElement.style.width = "100%";
    croppedImgElement.style.height = "auto";
    document.body.appendChild(croppedImgElement);
  }
}
