let yVal = 50;
let xVal = 50;
let ySpeed = 0;
let acc = 0.3;

function setup() {
  createCanvas(400, 500);
  frameRate(30);
}
function draw() {
  background(16, 17, 24);

  moveVertical();
  moveHorizontal();
  rect(xVal, yVal, 20, 50);
}

function moveVertical() {
  yVal = yVal + ySpeed;

  if (yVal > 450) {
    ySpeed = 0;
  } else {
    ySpeed = ySpeed + acc;
  }
}
function keyTyped() {
  if (key === " ") {
    ySpeed -= 5;
  }
}

function moveHorizontal() {
  if (keyIsDown(68)) {
    xVal += 2;
  } else if (keyIsDown(65)) {
    xVal -= 2;
  }
}
