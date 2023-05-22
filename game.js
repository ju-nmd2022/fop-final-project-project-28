//global

// game statges
let stage = "start";
let gameTime = 0;
let diffecultyTime = 0;
let diffeculty = 1;

//player

//platforms (rectangle)
let platform = [];
let platformLit = false;
let platformAmount = 6;
let platformHitBottom = false;

//spikes
let spike = [];
let spikeCounter = 0;
let valueSpike = Math.floor(Math.random() * 5) + 1;
let spikeCollide = false;
let spikeHitBottom = false;

//Canvas
let innerHeight = 600;
let innerWidth = 400;

//Setup
function setup() {
  createCanvas(innerWidth, innerHeight);

  player1 = new player(200, 450, 255, 255, 255);
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
    "     level: " +
      diffeculty +
      "     gametime: " +
      gameTime +
      "  lit: " +
      platformLit +
      "   bottom: " +
      platformHitBottom,
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

    if (spikeCounter == 180) {
      spike = [];
      spikeCounter = 0; // reset counter
      valueSpike = Math.floor(Math.random() * 5) + 1;
      // create spikes
      for (let i = 0; i < valueSpike + diffeculty; i++) {
        spike[i] = new spikes(random(0, innerWidth), 0);
      }
    }
    /* if (spikeHitBottom) {
      for (let i = 0; i < valueSpike + diffeculty; i++) {
        spike[i] = new spikes(random(0, innerWidth), 0);
        spikeHitBottom = false;
      }
    }*/
    // lose "villkor", how to get to the lose screen
    if (player1.y + player1.height >= innerHeight && gameTime >= 100000) {
      background(200, 17, 0);
    } else if (spikeCollide == true) {
    } else if (
      (platformHitBottom = true && platformLit == false && gameTime >= 10000)
    ) {
      background(0, 17, 20);
    }

    /////update platforms
    for (let i = 0; i < platformAmount; i++) {
      platform[i].move();
      platform[i].display();
    }
    // update and display spikes
    for (let i = 0; i < valueSpike; i++) {
      spike[i].display();
      spike[i].move();
    }
  }
}
//end of game
////stuff happens when key is presssed
function keyPressed() {
  if (keyCode === RIGHT_ARROW || key === "d") {
    player1.mR = true;
  }
  if (keyCode === LEFT_ARROW || key === "a") {
    player1.mL = true;
  }

  if (keyCode === UP_ARROW || key === " ") {
    player1.j = true;
    player1.y -= player1.yS;
    player1.yS = player1.yS - 5;
  }

  if (key == "p") {
    stage = "start";
  }
  if (key == "s") {
    stage = "game";
    /// some values that get restarted when u go into the startscreen
    gameTime = 0;
    spikeCounter = 0;
    platformCounter = 0;
    diffeculty = 1;
    diffecultyTime = 0;
    player1.x = 150;
    player1.y = 500;
    spikeCollide = false;
    ///clears the arrays
    gameTime = 0;
    diffecultyTime = 0;
    diffeculty = 1;
    spike = [];
    platform = [];
    //creates the platforms
    for (let i = 0; i < platformAmount; i++) {
      platform[i] = new platforms(
        random(0, innerWidth - platforms.width),
        100 * i,
        random(6) + diffeculty,
        1 + diffeculty,
        255,
        255,
        255
      );
    }
    // creates the spike after the button has ben pressed
    for (let i = 0; i < valueSpike; i++) {
      spike[i] = new spikes(random(0, innerWidth), 0);
    }
  }
}
function keyReleased() {
  if (keyCode === RIGHT_ARROW || key === "d") {
    player1.mR = false;
  }
  if (keyCode === LEFT_ARROW || key === "a") {
    player1.mL = false;
  }
  if (keyCode === UP_ARROW || key === " ") {
    player1.j = false;
  }
}
//end of functions

//start of classes
// the player class
class player {
  constructor(x, y, a, b, c) {
    this.x = x;
    this.y = y;
    this.yS = 0;
    this.xS = 5;
    this.acc = 0.3;
    this.width = 30;
    this.height = 30;
    this.j = false;
    this.mR = false;
    this.mL = false;
    this.a = a;
    this.b = b;
    this.c = c;
  }
  move() {
    //falling
    this.y += this.yS;
    this.yS += this.acc;
    // update moving character
    if (this.mR) {
      this.x += this.xS;
    }
    if (this.mL) {
      this.x -= this.xS;
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
    fill(this.a, this.b, this.c);
    rect(this.x, this.y, this.width, this.height);
  }
}
//end of player class

// Start of the platform class
class platforms {
  constructor(x, y, speed, fallspeed, a, b, c) {
    //platforms (rectangle)
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 15;
    this.speed = speed;
    this.yS = fallspeed;
    this.a = a;
    this.b = b;
    this.c = c;
    this.isOn = false;
    this.isDown = false;
    this.brick = this.width / 14;
    this.brickHeight = this.brick / 1.5;
  }

  move() {
    this.x += this.speed;
    this.y += this.yS;

    if (this.x < 0 || this.x + this.width > innerWidth) {
      this.speed *= -1;
    }
    if (this.y >= innerHeight) {
      platformHitBottom = true;
      this.isDown = true;
    } else {
      this.isDown = false;
      platformHitBottom = false;
    }
    if (this.y >= innerHeight + this.height) {
      platformLit = false;
      this.isOn = false;
      this.y = 0;
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
      platformLit = true;
      this.isOn = true;
    }
  }

  display() {
    // draw platform
    // set color based on isOn property
    if (this.isOn) {
      fill(this.a, this.b, 0); // change to green when player is on it
    } else {
      fill(100, 182, 172);
    }
<<<<<<< Updated upstream
    rect(this.x, this.y, this.width, this.height);
=======
    // rect(this.x, this.y, this.width, this.height);
    push();

    //First row of bricks
    rect(this.x, this.y, this.brick, this.brickHeight);
    rect(this.x + this.brick + 2, this.y, this.brick, this.brickHeight);
    rect(this.x + this.brick * 2, this.y, this.brick - 2, this.brickHeight);
    rect(this.x + this.brick * 3, this.y, this.brick - 2, this.brickHeight);
    rect(this.x + this.brick * 4, this.y, this.brick - 2, this.brickHeight);
    rect(this.x + this.brick * 5, this.y, this.brick - 2, this.brickHeight);
    rect(this.x + this.brick * 6, this.y, this.brick - 2, this.brickHeight);
    rect(this.x + this.brick * 7, this.y, this.brick - 2, this.brickHeight);
    rect(this.x + this.brick * 8, this.y, this.brick - 2, this.brickHeight);
    rect(this.x + this.brick * 9, this.y, this.brick - 2, this.brickHeight);
    rect(this.x + this.brick * 10, this.y, this.brick - 2, this.brickHeight);
    rect(this.x + this.brick * 11, this.y, this.brick - 2, this.brickHeight);
    rect(this.x + this.brick * 12, this.y, this.brick - 2, this.brickHeight);
    rect(this.x + this.brick * 13, this.y, this.brick - 2, this.brickHeight);

    //Second row of bricks
    rect(this.x, this.y + 12, 8, 10);
    rect(this.x + 10, this.y + 12, 16, 10);
    rect(this.x + 28, this.y + 12, 16, 10);
    rect(this.x + 46, this.y + 12, 16, 10);
    rect(this.x + 64, this.y + 12, 16, 10);
    rect(this.x + 82, this.y + 12, 16, 10);
    rect(this.x + 100, this.y + 12, 16, 10);
    rect(this.x + 118, this.y + 12, 16, 10);
    rect(this.x + 136, this.y + 12, 16, 10);
    rect(this.x + 154, this.y + 12, 16, 10);
    rect(this.x + 172, this.y + 12, 16, 10);
    rect(this.x + 190, this.y + 12, 16, 10);
    rect(this.x + 208, this.y + 12, 16, 10);
    rect(this.x + 226, this.y + 12, 16, 10);
    rect(this.x + 244, this.y + 12, 6, 10);

    //Third row of bricks
    rect(this.x, this.y + 24, 16, 10);
    rect(this.x + 18, this.y + 24, 16, 10);
    rect(this.x + 36, this.y + 24, 16, 10);
    rect(this.x + 54, this.y + 24, 16, 10);
    rect(this.x + 72, this.y + 24, 16, 10);
    rect(this.x + 90, this.y + 24, 16, 10);
    rect(this.x + 108, this.y + 24, 16, 10);
    rect(this.x + 126, this.y + 24, 16, 10);
    rect(this.x + 144, this.y + 24, 16, 10);
    rect(this.x + 162, this.y + 24, 16, 10);
    rect(this.x + 180, this.y + 24, 16, 10);
    rect(this.x + 198, this.y + 24, 16, 10);
    rect(this.x + 216, this.y + 24, 16, 10);
    rect(this.x + 234, this.y + 24, 16, 10);

    //Fourth row of bricks
    rect(this.x, this.y + 36, 8, 10);
    rect(this.x + 10, this.y + 36, 16, 10);
    rect(this.x + 28, this.y + 36, 16, 10);
    rect(this.x + 46, this.y + 36, 16, 10);
    rect(this.x + 64, this.y + 36, 16, 10);
    rect(this.x + 82, this.y + 36, 16, 10);
    rect(this.x + 100, this.y + 36, 16, 10);
    rect(this.x + 118, this.y + 36, 16, 10);
    rect(this.x + 136, this.y + 36, 16, 10);
    rect(this.x + 154, this.y + 36, 16, 10);
    rect(this.x + 172, this.y + 36, 16, 10);
    rect(this.x + 190, this.y + 36, 16, 10);
    rect(this.x + 208, this.y + 36, 16, 10);
    rect(this.x + 226, this.y + 36, 16, 10);
    rect(this.x + 244, this.y + 36, 6, 10);

    pop();
>>>>>>> Stashed changes
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
    this.y += random(2, 7) + diffeculty * 2;
    if (
      this.y + this.height >= player1.y &&
      this.x <= player1.x + player1.width &&
      this.y <= player1.y &&
      this.x + this.width >= player1.x
    ) {
      spikeCollide = true;
    }
    /*if (this.y >= innerHeight) {
      spikeHitBottom = true;
    }*/
  }
  display() {
    fill(255, 255, 255);
    rect(this.x, this.y, this.width, this.height);
  }
}
//end of spike class

//end of classes
