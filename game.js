//global

// game statges
let stage = "game";

//player
let yVal;
let xVal;
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
  frameRate(30);
  xVal = 50;
  yVal = 50;
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
  //movement of player
  moveH();
  keyPressed();
  yVal = yVal + ySpeed;
  ySpeed = ySpeed + acc;
  //hit the bottom of the screen
  if (yVal >= 500 - ySize && jump == false) {
    ySpeed = 0;
    yVal = yVal;
  } else {
  }

  //collision
}
//end of game

///functions
function keyPressed() {
  //jumping
  if (key === " " && ySpeed == 0) {
    ySpeed -= 10;
    jump = true;
  } else {
    jump = false;
  }
}
function moveH() {
  // movement left and right with restrictions (hitting borders)
  if (keyIsDown(65) && xVal > 0) {
    xVal -= 3;
  } else if (keyIsDown(68) && xVal < 400 - xSize) {
    xVal += 3;
  }
}
//end of functions
