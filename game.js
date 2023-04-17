//global

// game statges
let stage = "game";

//player
let yVal = 50;
let xVal = 200;
let ySpeed = 0;
let acc = 0.3;
let xSize = 30;
let ySize = 30;
let jump = false;

//platforms (rectangle)
let xPlat = 200;
let yPlat = 400;
let widthPlat = 90;
let heightPlat = 20;

//Setup
function setup() {
  createCanvas(400, 500);
}
//end of setup

//draw
function draw() {
  /// call on functions
  if (stage == "game") {
    gameScreen();
  }
}
//end of draw

//game
function gameScreen() {
  background(16, 17, 24);
  // draw platform
  rect(xPlat, yPlat, widthPlat, heightPlat);
  // draw player
  rect(xVal, yVal, xSize, ySize);
  moveH();
  keyPressed();
  //hit the bottom of the screen
  if (yVal >= 500 - ySize && jump == false) {
    yVal = 500 - ySize;
    ySpeed = 0;
  }
  yVal = yVal + ySpeed;
  ySpeed = ySpeed + acc;

  //collision
}
//end of game

///functions
function keyPressed() {
  //jumping
  if (key === " ") {
    yVal -= 10;
    jump = true;
  } else {
    jump = false;
  }
}
function moveH() {
  // movement left and right
  if (keyIsDown(65)) {
    xVal = xVal - 3;
  } else if (keyIsDown(68)) {
    xVal = xVal + 4;
  }
}
//end of functions
