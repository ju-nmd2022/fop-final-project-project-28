//global

// game statges
let stage = "start";
let gameTime = 0;
let diffecultyTime = 0;
let diffeculty = 1;

//player

//platforms (rectangle)
let platform = [];

let platformAmount = 7 - diffeculty;

//spikes
let spike = [];
let spikeCounter = 0;
let valueSpike = Math.floor(Math.random() * 5) + 1;
let spikeCollide = false;

//Canvas /*NEW*/
let innerHeight = 600; /*NEW*/
let innerWidth = 400; /*NEW*/

//Setup
function setup() {
  createCanvas(innerWidth, innerHeight); /*NEW*/

  player1 = new player(200, 450);
}
//end of setup

//draw
function draw() {
  /// call on functions
  if (stage == "game") {
    gameScreen();
  } else if (stage == "start") {
    startScreen();
  } else if (stage == "lose") {
    loseScreen();
  }
}
//end of draw

function startScreen() {
  // The look of the background
  background(67, 38, 100);
  //Text
  textSize(10);
  fill(255, 255, 255);
  text(
    "     time til next lvl: " +
      diffecultyTime +
      "     level: " +
      diffeculty +
      "     gametime: " +
      gameTime,
    10,
    10,
    width / 2,
    height / 2
  );
  /// some values that get restarted when u go into the startscreen
  gameTime = 0;
  spikeCounter = 0;
  platformCounter = 0;
  diffeculty = 1;
  diffecultyTime = 0;
  player1.x = 150;
  player1.y = 500;
  spikeCollide = false;
}

function loseScreen() {
  background(50, 50, 50);
  //Text
  textSize(10);
  fill(255, 255, 255);
  text(
    "     level: " + diffeculty + "     gametime: " + gameTime,
    10,
    10,
    width / 2,
    height / 2
  );
}

//game
function gameScreen() {
  // aestectics
  background(16, 17, 24);
  //Text
  textSize(10);
  fill(255, 255, 255);
  text(
    "     level: " + diffeculty + "     gametime: " + gameTime,
    10,
    10,
    width / 2,
    height / 2
  );

  //values that get uppdated, get added by one (these are mostly timers)
  gameTime += 1;
  spikeCounter += 1;
  diffecultyTime += 1;

  // make the playes
  player1.move();
  player1.display();

  if (stage == "game") {
    if (diffecultyTime === 300) {
      diffecultyTime = 0; // reset counter
      diffeculty += 1; // add to the difficulty every time
    }

    if (spikeCounter == 200) {
      spikeCounter = 0; // reset counter
      // create spikes
      for (let i = 0; i < valueSpike + diffeculty; i++) {
        spike[i] = new spikes(random(0, innerWidth), 0);
      }
    }

    // update and display spikes
    for (let i = 0; i < valueSpike; i++) {
      spike[i].move();
      spike[i].display();
    }

    /////update platforms
    for (let i = 0; i < platformAmount; i++) {
      platform[i].move();
      platform[i].display();
    }

    // lose "villkor", how to get to the lose screen
    if (player1.y + player1.height >= innerHeight && gameTime >= 1000) {
      stage = "lose";
    } else if (spikeCollide == true) {
      stage = "lose";
    }
  }
}
//end of game
////stuff happens when key is presssed
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
    player1.yS = player1.yS - 5;
  }

  if (key == "p") {
    stage = "start";
  }
  if (key == "o") {
    stage = "game";
    ///clears the arrays
    gameTime = 0;
    diffecultyTime = 0;
    diffeculty = 1;
    spike = [];
    platform = [];
    //creates the platforms
    for (let i = 0; i < platformAmount; i++) {
      platform[i] = new platforms(
        random(0, innerWidth),
        random(100, 150) * -i,
        random(6) + diffeculty,
        1 + diffeculty
      );
    }
    // creates the spike after the button has ben pressed
    for (let i = 0; i < valueSpike + diffeculty; i++) {
      spike[i] = new spikes(random(0, innerWidth), 0); //// 400 ska bli innnerwidth
    }
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
    if (this.j) {
      //jump height!!!!
    }

    //hit the bottom/top of the screen
    if (this.y + this.height >= innerHeight) {
      this.y = innerHeight - this.height;
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

    if (this.x < 0 || this.x + this.width > innerWidth) {
      /*NEW*/
      this.speed *= -1;
    }
    if (this.y >= innerHeight) {
      /*NEW*/
      this.y = -random(100, 150);
      this.x = random(0, innerWidth - this.width);
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
    this.width = 20;
    this.height = 50;
  }
  move() {
    this.y += random(7) + diffeculty;
    if (
      this.y + this.height >= player1.y &&
      this.x <= player1.x + player1.width &&
      this.y <= player1.y &&
      this.x + this.width >= player1.x
    ) {
      background(67, 2, 89);
    }
  }
  display() {
    fill(255, 255, 255);
    rect(this.x, this.y, this.width, this.height);
  }
}
//end of spike class

//end of classes
