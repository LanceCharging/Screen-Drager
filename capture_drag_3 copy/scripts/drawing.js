const img = document.createElement("img");

chrome.runtime.sendMessage({
  order: "message",
  message: "Window-Size",
});
chrome.runtime.sendMessage({
  order: "message",
  message: [
    "Window inner width:",
    window.innerWidth,
    "Window inner height:",
    window.innerHeight,
  ],
});

img.id = "capture_origin";
img.style.pointerEvents = "none";
document.body.appendChild(img);

chrome.runtime.sendMessage({ order: "give me d_url" }, function (response) {
  if (response) {
    img.src = response;
    chrome.runtime.sendMessage({
      order: "message",
      message: ["img-size : ", img.width, img.height],
    });
  }
});

img.onload = function () {
  const origin_width = document.getElementById("origin-width");
  const origin_height = document.getElementById("origin-height");
  origin_width.textContent = img.width.toString();
  origin_height.textContent = img.height.toString();

  img.style.width = "100%";
  img.style.height = "auto";
};

// const img = document.createElement("img");
// img.src = "이미지_소스_주소";
// img.id = "capture_origin";

// // 원하는 크기로 이미지 크기 조정
// img.width = 300; // 너비를 300px로 설정
// img.height = 200; // 높이를 200px로 설정

// // 이미지를 body 요소에 추가
// document.body.appendChild(img);
