chrome.runtime.sendMessage({ content: "communication start" });

let X1 = "?",
  Y1 = "?",
  X2 = "?",
  Y2 = "?";

document.addEventListener(
  "mousedown",
  (e) => {
    X1 = e.clientX;
    Y1 = e.clientY;
  },
  { once: true }
);

document.addEventListener(
  "mouseup",
  (e) => {
    X2 = e.clientX;
    Y2 = e.clientY;

    chrome.runtime.sendMessage({
      addressee: "background",
      order: "drag_coordinates",
      data: [X1, Y1, X2, Y2],
    });
  },
  { once: true }
);
