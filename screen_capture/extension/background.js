chrome.commands.onCommand.addListener(function (command) {
  if (command === "capture_full_page") {
    captureFullPage();
  }
});

function captureFullPage() {
  chrome.tabs.captureVisibleTab(null, { format: "png" }, function (dataUrl) {
    const blob = dataURLtoBlob(dataUrl);
    const url = URL.createObjectURL(blob);

    chrome.downloads.download({
      url: url,
      filename: "full_page_screenshot.png",
    });
  });
}

function dataURLtoBlob(dataUrl) {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
