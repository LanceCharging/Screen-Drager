chrome.commands.onCommand.addListener(function (command) {
  if (command === "capture_screen") {
    captureAndDisplayScreen();
  }
});

function captureAndDisplayScreen() {
  chrome.tabs.captureVisibleTab(null, { format: "png" }, function (dataUrl) {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    chrome.windows.create({
      url: dataUrl,
      type: "popup",
      width: screenWidth,
      height: screenHeight,
      left: 0,
      top: 0,
    });
  });
}
