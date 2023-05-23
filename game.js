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
let platformAmount = 7;

//spikes
let spike = [];
let spikeCounter = 0;
let valueSpike = Math.floor(Math.random() * 5) + 1;
let spikeCollide = false;
let spikeHitBottom = false;

//Canvas
let innerHeight = 700;
let innerWidth = 400;
let lavaCountdown = 360;

//Setup
function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(30);
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
  // makje it look nice here
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
  anyPlatformHitBottom = false; // skit i, existerar ej lol

  // aestectics ( lägg in backgrund här tack :D)
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
  lavaCountdown -= 1;

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

    if (gameTime <= 360) {
      text(
        lavaCountdown + " Seconds before the lava comes!",
        100,
        550,
        width / 2,
        height / 2
      );
    } else {
      rect(0, innerHeight - 20, innerWidth, 20);
    }

    // lose "villkor", how to get to the lose screen
    if (player1.y + player1.height >= innerHeight && gameTime >= 360) {
      background(200, 17, 0);
    } else if (spikeCollide) {
      background(200, 17, 100);
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
    if (player1.isOnGround) {
      player1.j = true;
      player1.y -= player1.yS;
      player1.yS = player1.yS - 8;
    }
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
    lavaCountdown = 360;
    gameTime = 0;
    diffecultyTime = 0;
    diffeculty = 1;
    ///clears the arrays
    spike = [];
    platform = [];
    //creates the platforms
    for (let i = 0; i < platformAmount; i++) {
      platform[i] = new platforms(
        random(0, innerWidth - platforms.width),
        100 * i,
        random(6) + diffeculty,
        1 + diffeculty
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
    this.isOnGround = false;
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

    //hit the bottom of the screen
    if (this.y + this.height >= innerHeight) {
      this.y = innerHeight - this.height;
      this.yS = 0;
      this.isOnGround = true;
    } else {
      this.isOnGround = false;
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
  constructor(x, y, speed, fallspeed) {
    //platforms (rectangle)
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 20;
    this.speed = speed;
    this.yS = fallspeed;

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
    /* if (
      this.y >= innerHeight - 50 &&
      this.y <= innerHeight - this.height &&
      this.y >= 200
    ) {
      anyPlatformHitBottom = true; // Set anyPlatformHitBottom to true if any platform hits the bottom
      this.isDown = true;
    } else {
      anyPlatformHitBottom = false;
      this.isDown = false;
    }*/

    if (this.y >= innerHeight) {
      platformLit = false;
      this.isOn = false;
      this.y = 0 - this.height;
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
      player1.isOnGround = true;
    }
  }

  display() {
    // draw platform
    // set color based on isOn property
    if (this.isOn) {
      fill(115, 193, 159);
    } else {
      fill(115, 193, 159);
    }

    rect(this.x, this.y, this.width, this.height);
    push();
    //First row of bricks (small)
    fill(19, 88, 80);
    rect(this.x, this.y, 4, 2);
    rect(this.x + 6, this.y, 4, 2);
    rect(this.x + 12, this.y, 4, 2);
    rect(this.x + 18, this.y, 4, 2);
    rect(this.x + 24, this.y, 4, 2);
    rect(this.x + 30, this.y, 4, 2);
    rect(this.x + 36, this.y, 4, 2);
    rect(this.x + 42, this.y, 4, 2);
    rect(this.x + 48, this.y, 4, 2);
    rect(this.x + 54, this.y, 4, 2);
    rect(this.x + 60, this.y, 4, 2);
    rect(this.x + 66, this.y, 4, 2);
    rect(this.x + 72, this.y, 4, 2);
    rect(this.x + 78, this.y, 4, 2);
    rect(this.x + 84, this.y, 4, 2);
    rect(this.x + 90, this.y, 4, 2);
    rect(this.x + 96, this.y, 4, 2);
    //Second row of bricks (small)
    rect(this.x, this.y + 3, 2, 2);
    rect(this.x + 4, this.y + 3, 4, 2);
    rect(this.x + 10, this.y + 3, 4, 2);
    rect(this.x + 16, this.y + 3, 4, 2);
    rect(this.x + 22, this.y + 3, 4, 2);
    rect(this.x + 28, this.y + 3, 4, 2);
    rect(this.x + 34, this.y + 3, 4, 2);
    rect(this.x + 40, this.y + 3, 4, 2);
    rect(this.x + 46, this.y + 3, 4, 2);
    rect(this.x + 52, this.y + 3, 4, 2);
    rect(this.x + 58, this.y + 3, 4, 2);
    rect(this.x + 64, this.y + 3, 4, 2);
    rect(this.x + 70, this.y + 3, 4, 2);
    rect(this.x + 76, this.y + 3, 4, 2);
    rect(this.x + 82, this.y + 3, 4, 2);
    rect(this.x + 88, this.y + 3, 4, 2);
    rect(this.x + 94, this.y + 3, 4, 2);

    //Third row of bricks (small)
    rect(this.x, this.y + 6, 4, 2);
    rect(this.x + 6, this.y + 6, 4, 2);
    rect(this.x + 12, this.y + 6, 4, 2);
    rect(this.x + 18, this.y + 6, 4, 2);
    rect(this.x + 24, this.y + 6, 4, 2);
    rect(this.x + 30, this.y + 6, 4, 2);
    rect(this.x + 36, this.y + 6, 4, 2);
    rect(this.x + 42, this.y + 6, 4, 2);
    rect(this.x + 48, this.y + 6, 4, 2);
    rect(this.x + 54, this.y + 6, 4, 2);
    rect(this.x + 60, this.y + 6, 4, 2);
    rect(this.x + 66, this.y + 6, 4, 2);
    rect(this.x + 72, this.y + 6, 4, 2);
    rect(this.x + 78, this.y + 6, 4, 2);
    rect(this.x + 84, this.y + 6, 4, 2);
    rect(this.x + 90, this.y + 6, 4, 2);
    rect(this.x + 96, this.y + 6, 4, 2);

    //Fourth row of bricks (small)
    rect(this.x, this.y + 9, 2, 2);
    rect(this.x + 4, this.y + 9, 4, 2);
    rect(this.x + 10, this.y + 9, 4, 2);
    rect(this.x + 16, this.y + 9, 4, 2);
    rect(this.x + 22, this.y + 9, 4, 2);
    rect(this.x + 28, this.y + 9, 4, 2);
    rect(this.x + 34, this.y + 9, 4, 2);
    rect(this.x + 40, this.y + 9, 4, 2);
    rect(this.x + 46, this.y + 9, 4, 2);
    rect(this.x + 52, this.y + 9, 4, 2);
    rect(this.x + 58, this.y + 9, 4, 2);
    rect(this.x + 64, this.y + 9, 4, 2);
    rect(this.x + 70, this.y + 9, 4, 2);
    rect(this.x + 76, this.y + 9, 4, 2);
    rect(this.x + 82, this.y + 9, 4, 2);
    rect(this.x + 88, this.y + 9, 4, 2);
    rect(this.x + 94, this.y + 9, 4, 2);

    //Fifth row of bricks (small)
    rect(this.x, this.y + 12, 4, 2);
    rect(this.x + 6, this.y + 12, 4, 2);
    rect(this.x + 12, this.y + 12, 4, 2);
    rect(this.x + 18, this.y + 12, 4, 2);
    rect(this.x + 24, this.y + 12, 4, 2);
    rect(this.x + 30, this.y + 12, 4, 2);
    rect(this.x + 36, this.y + 12, 4, 2);
    rect(this.x + 42, this.y + 12, 4, 2);
    rect(this.x + 48, this.y + 12, 4, 2);
    rect(this.x + 54, this.y + 12, 4, 2);
    rect(this.x + 60, this.y + 12, 4, 2);
    rect(this.x + 66, this.y + 12, 4, 2);
    rect(this.x + 72, this.y + 12, 4, 2);
    rect(this.x + 78, this.y + 12, 4, 2);
    rect(this.x + 84, this.y + 12, 4, 2);
    rect(this.x + 90, this.y + 12, 4, 2);
    rect(this.x + 96, this.y + 12, 4, 2);

    //Sithis.xth row of bricks (small)
    rect(this.x, this.y + 15, 2, 2);
    rect(this.x + 4, this.y + 15, 4, 2);
    rect(this.x + 10, this.y + 15, 4, 2);
    rect(this.x + 16, this.y + 15, 4, 2);
    rect(this.x + 22, this.y + 15, 4, 2);
    rect(this.x + 28, this.y + 15, 4, 2);
    rect(this.x + 34, this.y + 15, 4, 2);
    rect(this.x + 40, this.y + 15, 4, 2);
    rect(this.x + 46, this.y + 15, 4, 2);
    rect(this.x + 52, this.y + 15, 4, 2);
    rect(this.x + 58, this.y + 15, 4, 2);
    rect(this.x + 64, this.y + 15, 4, 2);
    rect(this.x + 70, this.y + 15, 4, 2);
    rect(this.x + 76, this.y + 15, 4, 2);
    rect(this.x + 82, this.y + 15, 4, 2);
    rect(this.x + 88, this.y + 15, 4, 2);
    rect(this.x + 94, this.y + 15, 4, 2);

    //Seventh row of bricks (small)
    rect(this.x, this.y + 18, 4, 2);
    rect(this.x + 6, this.y + 18, 4, 2);
    rect(this.x + 12, this.y + 18, 4, 2);
    rect(this.x + 18, this.y + 18, 4, 2);
    rect(this.x + 24, this.y + 18, 4, 2);
    rect(this.x + 30, this.y + 18, 4, 2);
    rect(this.x + 36, this.y + 18, 4, 2);
    rect(this.x + 42, this.y + 18, 4, 2);
    rect(this.x + 48, this.y + 18, 4, 2);
    rect(this.x + 54, this.y + 18, 4, 2);
    rect(this.x + 60, this.y + 18, 4, 2);
    rect(this.x + 66, this.y + 18, 4, 2);
    rect(this.x + 72, this.y + 18, 4, 2);
    rect(this.x + 78, this.y + 18, 4, 2);
    rect(this.x + 84, this.y + 18, 4, 2);
    rect(this.x + 90, this.y + 18, 4, 2);
    rect(this.x + 96, this.y + 18, 4, 2);
    pop();
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
    push();

    //Spikes (icicle)
    noStroke();
    //Dark
    fill(133, 189, 204);
    rect(this.x, this.y, this.width, this.height - 40);
    rect(this.x + 4, this.y + 20, this.width - 8, this.height - 40);
    rect(this.x + 8, this.y + 40, this.width - 16, this.height - 40);
    //Light
    fill(199, 236, 242);
    rect(this.x + 2, this.y + 10, this.width - 4, this.height - 40);
    rect(this.x + 6, this.y + 30, this.width - 12, this.height - 40);
    pop();
  }
}
//end of spike class

//end of classes
