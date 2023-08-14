const img = document.createElement("img");
img.style.width = "100%";
img.style.height = "auto";
img.id = "capture_origin";
img.style.pointerEvents = "none";
document.body.appendChild(img);

chrome.runtime.sendMessage({ order: "give me d_url" }, function (response) {
  if (response) {
    img.src = response;
  }
});
