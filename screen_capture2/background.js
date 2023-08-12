chrome.commands.onCommand.addListener(function (command) {
  if (command === "capture_screen") {
    captureAndDisplayScreen();
  }
});

function captureAndDisplayScreen() {
  chrome.tabs.captureVisibleTab(null, { format: "png" }, function (dataUrl) {
    chrome.tabs.create({ url: dataUrl });
  });
}
