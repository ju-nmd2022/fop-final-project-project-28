//global

// game statges
let stage = "game";

//player
let yVal = 50;
let xVal = 200;
let ySpeed = 0;
let xSpeed = 5;
let acc = 0.3;
let xSize = 30;
let ySize = 30;
let jump = false;
jHight = 10;
let moveRight = false;
let moveLeft = false;

//platforms (rectangle)
let xPlat = 200;
let yPlat = 350;
let widthPlat = 100;
let heightPlat = 15;
let platform1;
let platform2;
//Setup
function setup() {
  createCanvas(400, 500);
  platform1 = new platform(150, 250, 1);
  platform2 = new platform(50, 150, 2);
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

  //falling
  yVal = yVal + ySpeed;
  ySpeed = ySpeed + acc;

  //hit the bottom of the screen
  if (yVal + ySize >= 500) {
    yVal = 500 - ySize;
    ySpeed = 0;
  } else if (
    yVal + ySize <= yPlat + heightPlat &&
    yVal + ySize >= yPlat &&
    xVal + xSize >= xPlat &&
    xVal <= xPlat + widthPlat
  ) {
    ySpeed = 0;
    yVal = yPlat - ySize;
  }

  // update moving character
  if (moveRight) {
    xVal = xVal + xSpeed;
  }
  if (moveLeft) {
    xVal = xVal - xSpeed;
  }

  platform1.move();
  platform1.display();
  platform2.move();
  platform2.display();
  //Text
  textSize(10);
  fill(255, 255, 255);
  text(
    "moveRight =  " +
      moveRight +
      "     moveLeft = " +
      moveLeft +
      "     jump = " +
      jump +
      "                 yValue = " +
      yVal.toFixed(2) +
      "                 ySpeed = " +
      ySpeed.toFixed(2) +
      "      xSpeed = " +
      xSpeed,
    10,
    10,
    width / 2,
    height / 2
  );
}
//end of game

function keyPressed() {
  if (key == "d") {
    moveRight = true;
  }
  if (key == "a") {
    moveLeft = true;
  }
  if (ySpeed == 0) {
    if (key == " ") {
      yVal = yVal - ySpeed;
      ySpeed = ySpeed - jHight;
      jump = true;
    }
  }
}
function keyReleased() {
  if (key == "d") {
    moveRight = false;
  }
  if (key == "a") {
    moveLeft = false;
  }
}

class platform {
  constructor(x, y, speed) {
    //platforms (rectangle)
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 15;
    this.speed = speed;
  }

  move() {
    this.x += this.speed;
    if (this.x < 0 || this.x + this.width > 400) {
      this.speed *= -1;
    }
    if (
      yVal + ySize <= this.y + this.height &&
      yVal + ySize >= this.y &&
      xVal + xSize >= this.x &&
      xVal <= this.x + this.width
    ) {
      ySpeed = 0;
      yVal = this.y - ySize;
    }
  }

  display() {
    // draw platform
    fill(255, 255, 255);
    rect(this.x, this.y, this.width, this.height);
  }
}

//end of functions
