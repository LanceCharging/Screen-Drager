let d_url;

chrome.commands.onCommand.addListener(function (command) {
  if (command === "capture_screen") {
    captureAndDisplayScreen();
  }
});

function captureAndDisplayScreen() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
    const currentTabIndex = tab[0].index;

    chrome.tabs.captureVisibleTab(null, { format: "png" }, function (dataUrl) {
      chrome.tabs.create({ url: dataUrl, index: currentTabIndex + 1 });
      d_url = dataUrl;
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tab2) {
      const ImageTabId = tab2[0].id;
      chrome.scripting.executeScript({
        target: { tabId: ImageTabId, allFrames: true },
        files: ["scripts/drag.js"],
      });
    });

    chrome.runtime.sendMessage({ addressee: "drag", order: "drag" });

    chrome.runtime.onMessage.addListener(function (
      message,
      sender,
      sendResponse
    ) {
      if (message.addressee === "backgound") {
        if (message.order === "drag_coordinates") {
          console.log(message.data);
        }
      }
    });
  });
}
