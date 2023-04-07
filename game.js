let yVal;
let xVal;
let ySpeed = 0;
let acc = 0.3;
let xSize = 30;
let ySize = 30;

function setup() {
  createCanvas(400, 500);
  frameRate(30);
  xVal = 50;
  yVal = 50;
}
function draw() {
  background(16, 17, 24);
  rect(200, 400, 90, 20);
  rect(xVal, yVal, xSize, ySize);

  yVal = yVal + ySpeed;
  moveH();
  keyPressed();
  if (yVal > 500 - ySize) {
    ySpeed = 0;

    yVal = 500 - ySize;
  } else {
    ySpeed = ySpeed + acc;
  }
}

function keyPressed() {
  if (key === " " && ySpeed == 0) {
    ySpeed -= 10;
  }
}
function moveH() {
  if (keyIsDown(65) && xVal > 0) {
    xVal -= 3;
  } else if (keyIsDown(68) && xVal < 400 - xSize) {
    xVal += 3;
  }
}
