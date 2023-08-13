chrome.runtime.sendMessage({ order: "drag_start" });

let X1 = "?",
  Y1 = "?",
  X2 = "?",
  Y2 = "?";

const checkAndSendMessage = () => {
  if (X1 !== "?" && Y1 !== "?" && X2 !== "?" && Y2 !== "?") {
    clearInterval(interval);
    chrome.runtime.sendMessage({ order: "drag", drag: [X1, Y1, X2, Y2] });
  }
};

document.addEventListener("mousedown", (e) => {
  X1 = e.clientX;
  Y1 = e.clientY;
});

document.addEventListener("mouseup", (e) => {
  X2 = e.clientX;
  Y2 = e.clientY;
});

const interval = setInterval(checkAndSendMessage, 100);
