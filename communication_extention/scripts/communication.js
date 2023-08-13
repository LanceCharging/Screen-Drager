console.log("communication.js 호출");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse("hi");
});
