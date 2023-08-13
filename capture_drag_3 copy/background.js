let d_url;

chrome.commands.onCommand.addListener(function (command) {
  if (command === "capture_screen") {
    captureAndDisplayScreen();
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.order === "give me d_url") {
    sendResponse(d_url);
    console.log(d_url);
  } else if (message.order === "drag") {
    console.log("drag");
    console.log(message.drag);
  } else if (message.order === "drag_start") {
    console.log("drag_start");
  } else if (message.order === "click") {
    console.log(message.coordinate);
  }
});

function captureAndDisplayScreen() {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function (current_tab) {
      const currentTabIndex = current_tab[0].index;

      const capture = new Promise((resolve) => {
        chrome.tabs.captureVisibleTab(
          null,
          { format: "png" },
          function (dataUrl) {
            resolve(dataUrl);
          }
        );
      });

      capture.then((dataUrl) => {
        d_url = dataUrl;
        return new Promise((resolve) => {
          chrome.tabs.create({
            url: chrome.runtime.getURL("canvas.html"),
            index: currentTabIndex + 1,
          });
        });
      });
    }
  );
}
