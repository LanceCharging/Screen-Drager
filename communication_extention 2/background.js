console.log("백그라운드 호출");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message.content);
});

chrome.commands.onCommand.addListener(function (command) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab_id = tabs[0].id;
    chrome.scripting.executeScript(
      {
        target: { tabId: tab_id, allFrames: true },
        files: ["scripts/communication.js"],
      },
      (_) => {
        console.log("스크립트 활성화");
      }
    );
  });
});



.then((id) => {
  console.log(id);
  console.log("일단 여기까지");
  return new Promise((resolve) => {
    chrome.scripting.executeScript({
      target: { tabId: id, allFrames: true },
      files: ["scripts/drag.js"],
    });
  });
});