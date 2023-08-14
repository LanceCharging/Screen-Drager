chrome.runtime.sendMessage({ order: "drag_start" });

let startX, startY;

document.addEventListener("mousedown", (e) => {
  startX = e.clientX;
  startY = e.clientY;
});

document.addEventListener("mouseup", (e) => {
  const endX = e.clientX;
  const endY = e.clientY;

  // 드래그 시작 위치와 끝 위치 정보 사용하여 작업 수행
  chrome.runtime.sendMessage({
    order: "message",
    message: [startX, startY, endX, endY],
  });
});
