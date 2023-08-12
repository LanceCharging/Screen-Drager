let X1, Y1, X2, Y2;

console.log("start");

document.addEventListener("mousedown", (e) => {
  X1 = e.clientX;
  Y1 = e.clientY;
});
document.addEventListener("mouseup", (e) => {
  X2 = e.clientX;
  Y2 = e.clientY;
});

if (
  X1 !== undefined &&
  Y1 !== undefined &&
  X2 !== undefined &&
  Y2 !== undefined
) {
  console.log("Both mousedown and mouseup events have been triggered.");
}
