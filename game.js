//global

// game statges
let stage = "start";
let gameTime = 0;

//player

//platforms (rectangle)
//let platform = [1, 2, 3, 4];

let platformAmount = 3;
//spikes
let spike = [];
let spikeCounter = 0;
//Setup
function setup() {
  createCanvas(400, 500);
  platform1 = new platforms(random(0, 300), -200, random(3, 6), 1);
  platform2 = new platforms(random(0, 300), -100, random(3, 6), 1);
  platform3 = new platforms(random(0, 300), 0, random(3, 6), 1);
  platform4 = new platforms(random(0, 300), 100, random(3, 6), 1);
  platform5 = new platforms(random(0, 300), 200, random(3, 6), 1);

  player1 = new player(200, 450);
}
//end of setup

//draw
function draw() {
  /// call on functions
  if (stage == "game") {
    gameScreen();

    gameTime += 1;
    spikeCounter += 1; // increment spike counter
    platformCounter += 1;
  } else if (stage == "start") {
    yVal = 460;
    xVal = 200;
    startScreen();
    gameTime = 0;
    spikeCounter = 0;
    platformCounter = 0;
  }
}
//end of draw

function startScreen() {
  background(67, 38, 100);
}

//game
function gameScreen() {
  background(16, 17, 24);

  player1.move();
  player1.display();

  if (stage == "game") {
    /*for (let i = 0; i < platformAmount; i++) {
      platform[i] = new platforms(random(0, 300), random(0, 10));
    }*/

    if (spikeCounter == 150) {
      spikeCounter = 0; // reset counter
      let valueSpike = Math.floor(Math.random() * 5) + 1;

      for (let i = 0; i < valueSpike; i++) {
        spike[i] = new spikes(random(0, 400), 0);
      }
    }

    // update and display spikes
    for (let i = 0; i < 5; i++) {
      spike[i].move();
      spike[i].display();
    }

    //update and display platform
    /* for (let i = 0; i < platformAmount; i++) {
      platform[i].move();
      platform[i].display();
    }*/

    platform1.move();
    platform1.display();
    platform2.move();
    platform2.display();
    platform3.move();
    platform3.display();
    platform4.move();
    platform4.display();
    platform5.move();
    platform5.display();
  }

  //Text
  textSize(10);
  fill(255, 255, 255);
  text(
    "moveRight =  " +
      player1.mR +
      "     moveLeft = " +
      player1.mL +
      "     jump = " +
      player1.j +
      "     gametime  " +
      gameTime,
    10,
    10,
    width / 2,
    height / 2
  );
}
//end of game

function keyPressed() {
  if (key == "d") {
    player1.mR = true;
  }
  if (key == "a") {
    player1.mL = true;
  }

  if (key == " ") {
    player1.j = true;
    player1.y -= player1.yS;
    player1.yS = player1.yS - 8; //jump height!!!!
  }

  if (key == "p") {
    stage = "start";
    spike = [];
  }
  if (key == "o") {
    stage = "game";

    for (let i = 0; i < 10; i++) {
      spike[i] = new spikes(random(0, 400), 0);
    }
    /*for (let i = 0; i < platformAmount; i++) {
      platform[i] = new platforms(random(0, 300), 0);
    }*/
  }
}
function keyReleased() {
  if (key == "d") {
    player1.mR = false;
  }
  if (key == "a") {
    player1.mL = false;
  }
  if (key == " ") {
    player1.j = false;
  }
}
//end of functions
//start of classes
// the player class
class player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.yS = 0;
    this.xS = 5;
    this.a = 0.3;
    this.width = 30;
    this.height = 30;
    this.j = false;
    this.mR = false;
    this.mL = false;
  }
  move() {
    //falling
    this.y += this.yS;
    this.yS += this.a;
    // update moving character
    if (this.mR) {
      this.x += this.xS;
    }
    if (this.mL) {
      this.x -= this.xS;
    }

    //hit the bottom/top of the screen
    if (this.y + this.height >= 500) {
      this.y = 500 - this.height;
      this.yS = 0;
    }
    if (this.y <= 0) {
      this.y = 0;
      this.yS *= -1;
    }
  }
  display() {
    fill(255, 255, 255);
    rect(this.x, this.y, this.width, this.height);
  }
}
//end of player class

// Start of the platform class
class platforms {
  constructor(x, y, speed, fallspeed) {
    //platforms (rectangle)
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 15;
    this.speed = speed;
    this.yS = fallspeed;
  }

  move() {
    this.x += this.speed;
    this.y += this.yS;

    if (this.x < 0 || this.x + this.width > 400) {
      this.speed *= -1;
    }
    if (this.y >= 500) {
      this.y = 0;
      this.x = random(0, 300);
    }
    if (
      player1.y + player1.height <= this.y + this.height &&
      player1.y + player1.height >= this.y &&
      player1.x + player1.width >= this.x &&
      player1.x <= this.x + this.width
    ) {
      player1.yS = this.yS;
      player1.y = this.y - player1.height;
      player1.x += this.speed;
    }
  }

  display() {
    // draw platform
    fill(255, 255, 255);
    rect(this.x, this.y, this.width, this.height);
  }
}
//end of platform class

//start of the spike class
class spikes {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 20;
  }
  move() {
    this.y += random(7);
  }
  display() {
    fill(255, 255, 255);
    rect(this.x, this.y, this.width, this.height);
  }
}
//end of spike class

//end of classes
