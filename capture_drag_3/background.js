chrome.commands.onCommand.addListener(function (command) {
  if (command === "capture_screen") {
    captureAndDisplayScreen();
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

      capture
        .then((dataUrl) => {
          return new Promise((resolve) => {
            chrome.tabs.create(
              { url: dataUrl, index: currentTabIndex + 1 },
              function (h) {
                chrome.tabs.query(
                  { active: true, currentWindow: true },
                  function (created_tab) {
                    resolve(created_tab[0].id);
                  }
                );
              }
            );
          });
        })
        .then((id) => {
          console.log(id);
          console.log("일단 여기까지");
          chrome.scripting.executeScript({
            target: { tabId: id, allFrames: true },
            files: ["scripts/drag.js"],
          });
        });
    }
  );
}
