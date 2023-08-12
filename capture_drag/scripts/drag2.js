let d_url, X1, Y1, X2, Y2;

chrome.runtime.sendMessage({ requestDataUrl: true }, function (response) {
  d_url = response.dataUrl;
});

document.addEventListener("mousedown", (e) => {
  X1 = e.clientX;
  Y1 = e.clientY;
});
document.addEventListener("mouseup", (e) => {
  X2 = e.clientX;
  Y2 = e.clientY;
});

const image = new Image();
image.src = d_url;

const canvas = document.createElement("canvas");
canvas.width = Math.abs(X2 - X1);
canvas.height = Math.abs(Y2 - Y1);

const context = canvas.getContext("2d");
context.drawImage(
  image,
  X1,
  Y1,
  canvas.width,
  canvas.height,
  0,
  0,
  canvas.width,
  canvas.height
);

const croppedDataUrl = canvas.toDataURL("image/png");

chrome.runtime.sendMessage({ corppedDataUrl: croppedDataUrl });
