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

//lava
let lava = 40;
let lavaCountdown = lava;

// scoreboard
//let scores = []; this is not needed

let higestScore = 0;

let img; // this from p5 webbsite
let img2;
let img3;
function preload() {
  // this too
  img = loadImage("GameOver.png"); // i know it is a space between the game and over, idc
  img2 = loadImage("start.png");
  img3 = loadImage("gamescreen.png");
}
//Setup
function setup() {
  //https://github.com/processing/p5.js/wiki/Positioning-your-canvas how i got this shit to the html and for it to lay in the grid :D
  let cnvs = createCanvas(innerWidth, innerHeight); // the error comes from the createCanvas function being called before the DOM is fully loaded. chat gpt help to find the error
  cnvs.parent("game"); //puts game into the game div
  //createCanvas(innerWidth, innerHeight);
  frameRate(30);
  player1 = new player(200, innerWidth / 2 - this.width / 2, 255, 255, 255);
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
  scoreboard();
  image(img2, 0, 0);
  img2.resize(400, 700);
}

function loseScreen() {
  // makje it look nice here

  mountain(); // not used lol
  background(50, 50, 50);
  image(img, 0, 0);
  img.resize(400, 700);
  scoreboard();
  //Text
  push();

  textFont("Helvetica");
  textSize(25);
  fill(128, 0, 32);

  text("Lvl: " + diffeculty, innerWidth / 2 - 60, 310, width, height);
  textSize(15);
  text(
    "Time: " + round(gameTime) + "s",
    innerWidth / 2 - 60,
    350,
    width,
    height
  );
  fill(128, 0, 32);

  pop();

  if (gameTime >= higestScore) {
    //checks if gametime value is bigger or the same as higestscore
    higestScore = gameTime;
    localStorage.setItem("highscore", higestScore);
  }
}

//game
function gameScreen() {
  scoreboard();
  anyPlatformHitBottom = false; // skit i, existerar ej lol

  // aestectics ( lägg in backgrund här tack :D)

  background(0, 12, 46);
  image(img3, 0, 0);
  img3.resize(400, 700);
  //Text
  push();
  textSize(10);
  fill(255, 255, 255);

  textFont("Helvetica");
  textSize(14);

  text("Lvl: " + diffeculty, 10, 20, width, height);
  text("Time: " + round(gameTime) + "s", 10, 35, width, height);
  pop();

  //values that get uppdated, get added by one (these are mostly timers)

  gameTime += 0.1; // feels more like seconds if its 0.1 inst 1 but when shownig the number i round it to the nearest
  spikeCounter += 1;
  diffecultyTime += 1;
  lavaCountdown -= 0.1;

  // make the playes
  player1.move();
  player1.display();

  if (stage === "game") {
    if (diffecultyTime === 500) {
      diffecultyTime = 0; // reset counter
      diffeculty += 1; // add to the difficulty every time
    }

    if (spikeCounter === 180) {
      spike = [];
      spikeCounter = 0; // reset counter
      valueSpike = Math.floor(Math.random() * 5) + 1;
      // create spikes
      for (let i = 0; i < valueSpike; i++) {
        spike[i] = new spikes(random(0, innerWidth), 0);
      }
    }

    if (gameTime <= lava) {
      textFont("Helvetica");
      textSize(11);
      fill(255, 255, 255);

      text(
        round(lavaCountdown) + " Seconds before the lava comes!",
        100,
        550,
        width / 2,
        height / 2
      );
    } else {
      push();
      noStroke();
      fill(103, 49, 71);
      rect(0, innerHeight - 20, innerWidth, 20);

      pop();
    }

    // lose "villkor", how to get to the lose screen
    if (player1.y + player1.height >= innerHeight && gameTime >= lava) {
      stage = "lose";
    } else if (spikeCollide) {
      stage = "lose";
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

  if (key === "p") {
    stage = "start";
  }
  if (key === "s") {
    stage = "game";
    /// some values that get restarted when u go into the startscreen
    gameTime = 0;
    spikeCounter = 0;
    platformCounter = 0;
    diffeculty = 1;
    diffecultyTime = 0;
    player1.x = innerWidth / 2 - player1.width / 2;
    player1.y = innerHeight - player1.height;
    spikeCollide = false;
    lavaCountdown = lava;
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

function scoreboard() {
  const storedscore = localStorage.getItem("highscore");
  higestScore = storedscore;
  const scoreslist = document.getElementById("scores");

  const li = document.createElement("li");
  const nrScore = document.createTextNode(round(storedscore) + "s");
  li.appendChild(nrScore);
  scoreslist.innerHTML = "";
  scoreslist.appendChild(li);
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
      this.isOnGround = true; // this is used to check if it touching anything so i can stop it from double jumping
    } else {
      this.isOnGround = false;
    }
    if (this.y <= 0) {
      this.y = 0;
      this.yS *= -1;
    }
  }
  display() {
    push();
    noStroke();
    fill(73, 212, 157);

    rect(this.x, this.y + 5, this.width, this.height - 5);
    rect(this.x + 5, this.y, this.width - 10, this.height);
    fill(85, 133, 100);
    rect(this.x + 5, this.y + 13, 3, 6);
    rect(this.x + 20, this.y + 11, 3, 6);
    fill(255, 255, 255);
    rect(this.x + 15, this.y + 3, 6, 3);
    rect(this.x + 25, this.y + 10, 3, 10);
    pop();
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
    this.height = 19;
    this.speed = speed;
    this.yS = fallspeed;

    this.isOn = false;
    this.isDown = false;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.r2 = random(255);
    this.g2 = random(255);
    this.b2 = random(255);
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
      push();
      fill(this.r, this.g, this.b);
      //Medium brick

      rect(this.x, this.y, 100, 19);
      //First row of bricks (medium)
      fill(this.r2, this.g2, this.b2);
      rect(this.x, this.y, 6, 5);
      rect(this.x + 8, this.y, 12, 5);
      rect(this.x + 22, this.y, 12, 5);
      rect(this.x + 36, this.y, 12, 5);
      rect(this.x + 50, this.y, 12, 5);
      rect(this.x + 64, this.y, 12, 5);
      rect(this.x + 78, this.y, 12, 5);
      rect(this.x + 92, this.y, 8, 5);

      //Second row of bricks (medium)
      rect(this.x, this.y + 7, 11, 5);
      rect(this.x + 13, this.y + 7, 12, 5);
      rect(this.x + 27, this.y + 7, 12, 5);
      rect(this.x + 41, this.y + 7, 12, 5);
      rect(this.x + 55, this.y + 7, 12, 5);
      rect(this.x + 69, this.y + 7, 12, 5);
      rect(this.x + 83, this.y + 7, 12, 5);
      rect(this.x + 97, this.y + 7, 3, 5);

      //Third row of bricks (medium)
      rect(this.x, this.y + 14, 6, 5);
      rect(this.x + 8, this.y + 14, 12, 5);
      rect(this.x + 22, this.y + 14, 12, 5);
      rect(this.x + 36, this.y + 14, 12, 5);
      rect(this.x + 50, this.y + 14, 12, 5);
      rect(this.x + 64, this.y + 14, 12, 5);
      rect(this.x + 78, this.y + 14, 12, 5);
      rect(this.x + 92, this.y + 14, 8, 5);
      pop();
    } else {
      push();
      fill(199, 236, 242);
      //Medium brick

      rect(this.x, this.y, 100, 19);
      //First row of bricks (medium)
      fill(15, 59, 62);
      rect(this.x, this.y, 6, 5);
      rect(this.x + 8, this.y, 12, 5);
      rect(this.x + 22, this.y, 12, 5);
      rect(this.x + 36, this.y, 12, 5);
      rect(this.x + 50, this.y, 12, 5);
      rect(this.x + 64, this.y, 12, 5);
      rect(this.x + 78, this.y, 12, 5);
      rect(this.x + 92, this.y, 8, 5);

      //Second row of bricks (medium)
      rect(this.x, this.y + 7, 11, 5);
      rect(this.x + 13, this.y + 7, 12, 5);
      rect(this.x + 27, this.y + 7, 12, 5);
      rect(this.x + 41, this.y + 7, 12, 5);
      rect(this.x + 55, this.y + 7, 12, 5);
      rect(this.x + 69, this.y + 7, 12, 5);
      rect(this.x + 83, this.y + 7, 12, 5);
      rect(this.x + 97, this.y + 7, 3, 5);

      //Third row of bricks (medium)
      rect(this.x, this.y + 14, 6, 5);
      rect(this.x + 8, this.y + 14, 12, 5);
      rect(this.x + 22, this.y + 14, 12, 5);
      rect(this.x + 36, this.y + 14, 12, 5);
      rect(this.x + 50, this.y + 14, 12, 5);
      rect(this.x + 64, this.y + 14, 12, 5);
      rect(this.x + 78, this.y + 14, 12, 5);
      rect(this.x + 92, this.y + 14, 8, 5);
      pop();
    }
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
// draw functions
function mountain() {
  let x = 100;
  let y = 100;
  push();
  noStroke();

  //Background
  //Colordrop
  fill(0, 12, 46);
  rect(x - 100, y - 100, 400, 60);

  fill(0, 21, 52);
  rect(x - 100, y - 40, 400, 60);

  fill(0, 37, 56);
  rect(x - 100, y + 20, 400, 60);

  fill(1, 66, 72);
  rect(x - 100, y + 80, 400, 60);

  fill(1, 100, 87);
  rect(x - 100, y + 140, 400, 60);

  fill(6, 124, 98);
  rect(x - 100, y + 200, 400, 60);

  fill(1, 66, 72);
  rect(x - 100, y + 260, 400, 80);

  fill(0, 37, 56);
  rect(x - 100, y + 340, 400, 80);

  fill(0, 21, 52);
  rect(x - 100, 520, 400, 80);

  fill(0, 21, 46);
  rect(x - 100, y + 500, 450, 100);

  //Dark (left mountain)
  fill(0, 21, 50);
  rect(x + 30, y + 110, 30, 10);
  rect(x + 20, y + 120, 50, 10);
  rect(x + 10, y + 130, 70, 10);
  rect(x, y + 140, 90, 10);
  rect(x - 10, y + 150, 110, 10);
  rect(x - 20, y + 160, 130, 10);
  rect(x - 30, y + 170, 330, 10);
  rect(x - 40, y + 180, 340, 10);
  rect(x - 50, y + 190, 350, 10);
  rect(x - 70, y + 200, 370, 10);
  rect(x - 80, y + 210, 380, 10);
  rect(x - 90, y + 220, 390, 10);
  rect(x - 100, y + 230, 400, 30);

  //Medium (left mounatain)
  fill(1, 111, 90);
  rect(x + 30, y + 110, 30, 10);
  rect(x + 20, y + 120, 30, 10);
  rect(x + 10, y + 130, 30, 10);
  rect(x, y + 140, 30, 10);
  rect(x - 10, y + 150, 40, 10);
  rect(x - 20, y + 160, 40, 10);
  rect(x - 30, y + 170, 30, 10);
  rect(x - 40, y + 180, 30, 10);
  rect(x - 50, y + 190, 30, 10);
  rect(x - 70, y + 200, 50, 10);
  rect(x - 80, y + 210, 40, 10);
  rect(x - 90, y + 220, 40, 10);
  rect(x - 100, y + 230, 50, 10);
  rect(x - 100, y + 240, 40, 10);
  rect(x - 100, y + 250, 20, 10);
  rect(x - 60, y + 250, 10, 10);
  rect(x - 50, y + 230, 10, 20);
  rect(x - 20, y + 210, 10, 20);
  rect(x - 30, y + 230, 10, 10);
  rect(x - 10, y + 200, 10, 20);
  rect(x, y + 180, 10, 10);
  rect(x + 20, y + 170, 10, 10);

  //Light (left mountain)
  fill(2, 161, 108);
  rect(x + 30, y + 110, 20, 10);
  rect(x + 20, y + 120, 20, 10);
  rect(x + 10, y + 130, 20, 10);
  rect(x, y + 140, 20, 10);
  rect(x - 10, y + 150, 30, 10);
  rect(x - 20, y + 160, 20, 10);
  rect(x - 30, y + 170, 20, 10);
  rect(x - 40, y + 180, 20, 10);
  rect(x - 50, y + 190, 30, 10);
  rect(x - 70, y + 200, 30, 10);
  rect(x - 80, y + 210, 30, 10);
  rect(x - 90, y + 220, 30, 10);
  rect(x - 100, y + 230, 30, 10);
  rect(x - 100, y + 240, 30, 10);
  rect(x - 100, y + 250, 10, 10);

  //Extra light (left mountain)
  fill(2, 182, 122);
  rect(x + 30, y + 110, 10, 10);
  rect(x + 20, y + 120, 10, 10);
  rect(x + 10, y + 130, 10, 10);
  rect(x, y + 140, 10, 10);
  rect(x - 10, y + 150, 20, 10);
  rect(x - 20, y + 160, 10, 10);
  rect(x - 30, y + 170, 10, 10);
  rect(x - 40, y + 180, 10, 10);
  rect(x - 50, y + 190, 10, 10);
  rect(x - 70, y + 200, 20, 10);
  rect(x - 80, y + 210, 10, 10);
  rect(x - 90, y + 220, 20, 10);
  rect(x - 100, y + 230, 10, 10);

  //Dark (right mountain)
  fill(0, 21, 50);
  rect(x + 250, y, 50, 10);
  rect(x + 240, y + 10, 60, 10);
  rect(x + 230, y + 20, 70, 10);
  rect(x + 220, y + 30, 80, 10);
  rect(x + 210, y + 40, 90, 10);
  rect(x + 200, y + 50, 100, 10);
  rect(x + 180, y + 60, 120, 10);
  rect(x + 170, y + 70, 130, 10);
  rect(x + 160, y + 80, 140, 10);
  rect(x + 150, y + 90, 150, 20);
  rect(x + 140, y + 110, 160, 10);
  rect(x + 130, y + 120, 170, 10);
  rect(x + 120, y + 130, 180, 10);
  rect(x + 110, y + 140, 190, 10);
  rect(x + 100, y + 150, 200, 10);
  rect(x + 110, y + 160, 190, 10);

  //Medium (right mounatain)
  fill(1, 111, 90);
  rect(x + 280, y - 40, 20, 10);
  rect(x + 270, y - 30, 30, 10);
  rect(x + 260, y - 20, 40, 20);
  rect(x + 250, y, 50, 10);
  rect(x + 240, y + 10, 50, 10);
  rect(x + 230, y + 20, 50, 10);
  rect(x + 220, y + 30, 60, 10);
  rect(x + 210, y + 40, 60, 10);
  rect(x + 200, y + 50, 50, 10);
  rect(x + 180, y + 60, 60, 10);
  rect(x + 170, y + 70, 60, 10);
  rect(x + 160, y + 80, 60, 10);
  rect(x + 150, y + 90, 50, 10);
  rect(x + 150, y + 100, 50, 10);
  rect(x + 140, y + 110, 50, 10);
  rect(x + 130, y + 120, 50, 10);
  rect(x + 120, y + 130, 50, 10);
  rect(x + 110, y + 140, 40, 10);
  rect(x + 100, y + 150, 40, 10);
  rect(x + 190, y + 130, 10, 20);
  rect(x + 180, y + 150, 10, 10);
  rect(x + 150, y + 150, 10, 10);
  rect(x + 140, y + 160, 10, 10);
  rect(x + 120, y + 160, 10, 10);
  rect(x + 110, y + 170, 10, 10);
  rect(x + 170, y + 140, 10, 30);
  rect(x + 200, y + 110, 10, 20);
  rect(x + 240, y + 70, 10, 20);
  rect(x + 230, y + 90, 10, 10);

  //Light (right mountain)
  fill(2, 161, 108);
  rect(x + 280, y - 40, 10, 10);
  rect(x + 270, y - 30, 20, 10);
  rect(x + 260, y - 20, 20, 20);
  rect(x + 250, y, 20, 10);
  rect(x + 240, y + 10, 30, 10);
  rect(x + 230, y + 20, 30, 10);
  rect(x + 220, y + 30, 30, 10);
  rect(x + 210, y + 40, 40, 10);
  rect(x + 200, y + 50, 30, 10);
  rect(x + 180, y + 60, 40, 10);
  rect(x + 170, y + 70, 40, 10);
  rect(x + 160, y + 80, 40, 10);
  rect(x + 150, y + 90, 30, 10);
  rect(x + 150, y + 100, 20, 10);
  rect(x + 140, y + 110, 20, 10);
  rect(x + 130, y + 120, 30, 10);
  rect(x + 120, y + 130, 20, 10);
  rect(x + 110, y + 140, 20, 10);
  rect(x + 100, y + 150, 20, 10);

  //Extra light (right mountain)
  fill(2, 182, 122);
  rect(x + 270, y - 30, 10, 10);
  rect(x + 260, y - 20, 10, 20);
  rect(x + 250, y, 10, 10);
  rect(x + 240, y + 10, 10, 10);
  rect(x + 230, y + 20, 10, 10);
  rect(x + 220, y + 30, 10, 10);
  rect(x + 210, y + 40, 10, 10);
  rect(x + 200, y + 50, 10, 10);
  rect(x + 180, y + 60, 20, 10);
  rect(x + 170, y + 70, 20, 10);
  rect(x + 160, y + 80, 10, 10);
  rect(x + 150, y + 90, 10, 10);
  rect(x + 150, y + 100, 10, 10);
  rect(x + 140, y + 110, 10, 10);
  rect(x + 130, y + 120, 10, 10);
  rect(x + 120, y + 130, 10, 10);
  pop();
} //End of mountain
function mountainEdit() {
  let x = 100;
  let y = 450;
  push();
  noStroke();

  //Dark (left mountain)
  fill(0, 21, 50);
  rect(x + 30, y + 110, 30, 10);
  rect(x + 20, y + 120, 50, 10);
  rect(x + 10, y + 130, 70, 10);
  rect(x, y + 140, 90, 10);
  rect(x - 10, y + 150, 110, 10);
  rect(x - 20, y + 160, 130, 10);
  rect(x - 30, y + 170, 330, 10);
  rect(x - 40, y + 180, 340, 10);
  rect(x - 50, y + 190, 350, 10);
  rect(x - 70, y + 200, 370, 10);
  rect(x - 80, y + 210, 380, 10);
  rect(x - 90, y + 220, 390, 10);
  rect(x - 100, y + 230, 400, 30);

  //Medium (left mounatain)
  fill(1, 111, 90);
  rect(x + 30, y + 110, 30, 10);
  rect(x + 20, y + 120, 30, 10);
  rect(x + 10, y + 130, 30, 10);
  rect(x, y + 140, 30, 10);
  rect(x - 10, y + 150, 40, 10);
  rect(x - 20, y + 160, 40, 10);
  rect(x - 30, y + 170, 30, 10);
  rect(x - 40, y + 180, 30, 10);
  rect(x - 50, y + 190, 30, 10);
  rect(x - 70, y + 200, 50, 10);
  rect(x - 80, y + 210, 40, 10);
  rect(x - 90, y + 220, 40, 10);
  rect(x - 100, y + 230, 50, 10);
  rect(x - 100, y + 240, 40, 10);
  rect(x - 100, y + 250, 20, 10);
  rect(x - 60, y + 250, 10, 10);
  rect(x - 50, y + 230, 10, 20);
  rect(x - 20, y + 210, 10, 20);
  rect(x - 30, y + 230, 10, 10);
  rect(x - 10, y + 200, 10, 20);
  rect(x, y + 180, 10, 10);
  rect(x + 20, y + 170, 10, 10);

  //Light (left mountain)
  fill(2, 161, 108);
  rect(x + 30, y + 110, 20, 10);
  rect(x + 20, y + 120, 20, 10);
  rect(x + 10, y + 130, 20, 10);
  rect(x, y + 140, 20, 10);
  rect(x - 10, y + 150, 30, 10);
  rect(x - 20, y + 160, 20, 10);
  rect(x - 30, y + 170, 20, 10);
  rect(x - 40, y + 180, 20, 10);
  rect(x - 50, y + 190, 30, 10);
  rect(x - 70, y + 200, 30, 10);
  rect(x - 80, y + 210, 30, 10);
  rect(x - 90, y + 220, 30, 10);
  rect(x - 100, y + 230, 30, 10);
  rect(x - 100, y + 240, 30, 10);
  rect(x - 100, y + 250, 10, 10);

  //Extra light (left mountain)
  fill(2, 182, 122);
  rect(x + 30, y + 110, 10, 10);
  rect(x + 20, y + 120, 10, 10);
  rect(x + 10, y + 130, 10, 10);
  rect(x, y + 140, 10, 10);
  rect(x - 10, y + 150, 20, 10);
  rect(x - 20, y + 160, 10, 10);
  rect(x - 30, y + 170, 10, 10);
  rect(x - 40, y + 180, 10, 10);
  rect(x - 50, y + 190, 10, 10);
  rect(x - 70, y + 200, 20, 10);
  rect(x - 80, y + 210, 10, 10);
  rect(x - 90, y + 220, 20, 10);
  rect(x - 100, y + 230, 10, 10);

  //Dark (right mountain)
  fill(0, 21, 50);
  rect(x + 250, y, 50, 10);
  rect(x + 240, y + 10, 60, 10);
  rect(x + 230, y + 20, 70, 10);
  rect(x + 220, y + 30, 80, 10);
  rect(x + 210, y + 40, 90, 10);
  rect(x + 200, y + 50, 100, 10);
  rect(x + 180, y + 60, 120, 10);
  rect(x + 170, y + 70, 130, 10);
  rect(x + 160, y + 80, 140, 10);
  rect(x + 150, y + 90, 150, 20);
  rect(x + 140, y + 110, 160, 10);
  rect(x + 130, y + 120, 170, 10);
  rect(x + 120, y + 130, 180, 10);
  rect(x + 110, y + 140, 190, 10);
  rect(x + 100, y + 150, 200, 10);
  rect(x + 110, y + 160, 190, 10);

  //Medium (right mounatain)
  fill(1, 111, 90);
  rect(x + 280, y - 40, 20, 10);
  rect(x + 270, y - 30, 30, 10);
  rect(x + 260, y - 20, 40, 20);
  rect(x + 250, y, 50, 10);
  rect(x + 240, y + 10, 50, 10);
  rect(x + 230, y + 20, 50, 10);
  rect(x + 220, y + 30, 60, 10);
  rect(x + 210, y + 40, 60, 10);
  rect(x + 200, y + 50, 50, 10);
  rect(x + 180, y + 60, 60, 10);
  rect(x + 170, y + 70, 60, 10);
  rect(x + 160, y + 80, 60, 10);
  rect(x + 150, y + 90, 50, 10);
  rect(x + 150, y + 100, 50, 10);
  rect(x + 140, y + 110, 50, 10);
  rect(x + 130, y + 120, 50, 10);
  rect(x + 120, y + 130, 50, 10);
  rect(x + 110, y + 140, 40, 10);
  rect(x + 100, y + 150, 40, 10);
  rect(x + 190, y + 130, 10, 20);
  rect(x + 180, y + 150, 10, 10);
  rect(x + 150, y + 150, 10, 10);
  rect(x + 140, y + 160, 10, 10);
  rect(x + 120, y + 160, 10, 10);
  rect(x + 110, y + 170, 10, 10);
  rect(x + 170, y + 140, 10, 30);
  rect(x + 200, y + 110, 10, 20);
  rect(x + 240, y + 70, 10, 20);
  rect(x + 230, y + 90, 10, 10);

  //Light (right mountain)
  fill(2, 161, 108);
  rect(x + 280, y - 40, 10, 10);
  rect(x + 270, y - 30, 20, 10);
  rect(x + 260, y - 20, 20, 20);
  rect(x + 250, y, 20, 10);
  rect(x + 240, y + 10, 30, 10);
  rect(x + 230, y + 20, 30, 10);
  rect(x + 220, y + 30, 30, 10);
  rect(x + 210, y + 40, 40, 10);
  rect(x + 200, y + 50, 30, 10);
  rect(x + 180, y + 60, 40, 10);
  rect(x + 170, y + 70, 40, 10);
  rect(x + 160, y + 80, 40, 10);
  rect(x + 150, y + 90, 30, 10);
  rect(x + 150, y + 100, 20, 10);
  rect(x + 140, y + 110, 20, 10);
  rect(x + 130, y + 120, 30, 10);
  rect(x + 120, y + 130, 20, 10);
  rect(x + 110, y + 140, 20, 10);
  rect(x + 100, y + 150, 20, 10);

  //Extra light (right mountain)
  fill(2, 182, 122);
  rect(x + 270, y - 30, 10, 10);
  rect(x + 260, y - 20, 10, 20);
  rect(x + 250, y, 10, 10);
  rect(x + 240, y + 10, 10, 10);
  rect(x + 230, y + 20, 10, 10);
  rect(x + 220, y + 30, 10, 10);
  rect(x + 210, y + 40, 10, 10);
  rect(x + 200, y + 50, 10, 10);
  rect(x + 180, y + 60, 20, 10);
  rect(x + 170, y + 70, 20, 10);
  rect(x + 160, y + 80, 10, 10);
  rect(x + 150, y + 90, 10, 10);
  rect(x + 150, y + 100, 10, 10);
  rect(x + 140, y + 110, 10, 10);
  rect(x + 130, y + 120, 10, 10);
  rect(x + 120, y + 130, 10, 10);
  pop();
}
