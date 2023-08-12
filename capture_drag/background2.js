let d_url;

chrome.commands.onCommand.addListener(function (command) {
  if (command === "capture_screen") {
    captureAndDisplayScreen();
  }
});

function captureAndDisplayScreen() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
    const currentTabIndex = tab[0].index;
    const currentTabId = tab[0].id;

    chrome.tabs.captureVisibleTab(null, { format: "png" }, function (dataUrl) {
      chrome.tabs.create({ url: dataUrl, index: currentTabIndex + 1 });
      d_url = dataUrl;
    });

    chrome.scripting.executeScript({
      target: { tabId: currentTabId, allFrames: true },
      files: ["scripts/drag.js"],
    });
  });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.requestDataUrl) {
    sendResponse({ dataUrl: d_url });
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.corppedDataUrl) {
    chrome.tabs.create({ url: message.corppedDataUrl });
  }
});
