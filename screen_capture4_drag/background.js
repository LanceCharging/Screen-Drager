chrome.commands.onCommand.addListener(function (command) {
  if (command === "capture_screen") {
    captureAndDisplayScreen();
  }
});

function captureAndDisplayScreen() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
    const currentTabIndex = tab[0].index;

    chrome.tabs.captureVisibleTab(null, { format: "png" }, function (dataUrl) {
      const img = new Image();
      img.src = dataUrl;
      img.onload = function() {
        const canvas = 






      }

      chrome.tabs.create({ url: dataUrl, index: currentTabIndex + 1 });
    });
  });
}
