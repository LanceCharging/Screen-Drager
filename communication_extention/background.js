console.log("백그라운드 호출");

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

    if (command === "1") {
      communicate("1", tab_id);
    } else if (command === "2") {
      communicate("2", tab_id);
    } else if (command === "3") {
      communicate("3", tab_id);
    }
  });
});

function communicate(parameter1, tab_id) {
  console.log("communicate 시작");
  chrome.tabs.sendMessage(
    tab_id,
    { addressee: "communication.js", order: parameter1 },
    (response) => {
      console.log("Response from communicatinon:", response);
    }
  );
}
