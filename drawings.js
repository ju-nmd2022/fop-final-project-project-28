/*Foundations of Programming
Group 28, Linn Halvarsson & Julia Oppmark
This is a file containing all drawings used for our main game
*/

x = 100;
y = 100;
noStroke();
/*
//Brick platform
fill(218, 255, 239);
rect(x, y, x + 150, y - 50);

fill(100, 182, 172);
//First row of bricks
rect(x, y, 16, 10);
rect(x + 18, y, 16, 10);
rect(x + 36, y, 16, 10);
rect(x + 54, y, 16, 10);
rect(x + 72, y, 16, 10);
rect(x + 90, y, 16, 10);
rect(x + 108, y, 16, 10);
rect(x + 126, y, 16, 10);
rect(x + 144, y, 16, 10);
rect(x + 162, y, 16, 10);
rect(x + 180, y, 16, 10);
rect(x + 198, y, 16, 10);
rect(x + 216, y, 16, 10);
rect(x + 234, y, 16, 10);

//Second row of bricks
rect(x, y + 12, 8, 10);
rect(x + 10, y + 12, 16, 10);
rect(x + 28, y + 12, 16, 10);
rect(x + 46, y + 12, 16, 10);
rect(x + 64, y + 12, 16, 10);
rect(x + 82, y + 12, 16, 10);
rect(x + 100, y + 12, 16, 10);
rect(x + 118, y + 12, 16, 10);
rect(x + 136, y + 12, 16, 10);
rect(x + 154, y + 12, 16, 10);
rect(x + 172, y + 12, 16, 10);
rect(x + 190, y + 12, 16, 10);
rect(x + 208, y + 12, 16, 10);
rect(x + 226, y + 12, 16, 10);
rect(x + 244, y + 12, 6, 10);

//Third row of bricks
rect(x, y + 24, 16, 10);
rect(x + 18, y + 24, 16, 10);
rect(x + 36, y + 24, 16, 10);
rect(x + 54, y + 24, 16, 10);
rect(x + 72, y + 24, 16, 10);
rect(x + 90, y + 24, 16, 10);
rect(x + 108, y + 24, 16, 10);
rect(x + 126, y + 24, 16, 10);
rect(x + 144, y + 24, 16, 10);
rect(x + 162, y + 24, 16, 10);
rect(x + 180, y + 24, 16, 10);
rect(x + 198, y + 24, 16, 10);
rect(x + 216, y + 24, 16, 10);
rect(x + 234, y + 24, 16, 10);

//Fourth row of bricks
rect(x, y + 36, 8, 10);
rect(x + 10, y + 36, 16, 10);
rect(x + 28, y + 36, 16, 10);
rect(x + 46, y + 36, 16, 10);
rect(x + 64, y + 36, 16, 10);
rect(x + 82, y + 36, 16, 10);
rect(x + 100, y + 36, 16, 10);
rect(x + 118, y + 36, 16, 10);
rect(x + 136, y + 36, 16, 10);
rect(x + 154, y + 36, 16, 10);
rect(x + 172, y + 36, 16, 10);
rect(x + 190, y + 36, 16, 10);
rect(x + 208, y + 36, 16, 10);
rect(x + 226, y + 36, 16, 10);
rect(x + 244, y + 36, 6, 10);
*/
//Fairy
//Wings
//Wings outline
fill(46, 161, 182);
rect(x + 30, y + 90, 30, 10);
rect(x + 20, y + 100, 60, 10);
rect(x + 10, y + 110, 80, 10);
rect(x + 10, y + 120, 90, 10);
rect(x + 10, y + 130, 100, 10);
rect(x + 20, y + 140, 100, 10);
rect(x + 40, y + 150, 80, 10);
rect(x + 50, y + 160, 60, 10);
rect(x + 40, y + 170, 60, 10);
rect(x + 30, y + 180, 60, 10);
rect(x + 30, y + 190, 50, 10);
rect(x + 40, y + 200, 30, 10);

//Wings inline
fill(46, 196, 225);
rect(x + 30, y + 100, 30, 10);
rect(x + 20, y + 110, 60, 10);
rect(x + 20, y + 120, 70, 10);
rect(x + 20, y + 130, 80, 10);
rect(x + 40, y + 140, 70, 10);
rect(x + 60, y + 150, 40, 10);
rect(x + 50, y + 170, 40, 10);
rect(x + 40, y + 180, 40, 10);
rect(x + 40, y + 190, 30, 10);

//Wings shine
fill(144, 215, 238);
rect(x + 40, y + 110, 10, 10);
rect(x + 30, y + 120, 30, 10);
rect(x + 50, y + 130, 30, 10);
rect(x + 50, y + 180, 20, 10);

//Dress
//Dress outline
fill(216, 30, 91);
rect(x + 130, y + 140, 40, 10);
rect(x + 120, y + 150, 60, 10);
rect(x + 110, y + 160, 70, 10);
rect(x + 100, y + 170, 90, 10);
rect(x + 90, y + 180, 100, 10);
rect(x + 80, y + 190, 110, 20);
rect(x + 90, y + 210, 100, 10);
rect(x + 110, y + 220, 80, 10);
rect(x + 140, y + 230, 50, 10);
rect(x + 150, y + 240, 40, 10);
rect(x + 160, y + 250, 20, 10);

//Dress inline
fill(247, 66, 133);
rect(x + 140, y + 140, 10, 10);
rect(x + 130, y + 150, 20, 10);
rect(x + 120, y + 160, 10, 10);
rect(x + 110, y + 170, 10, 10);
rect(x + 130, y + 170, 50, 10);
rect(x + 100, y + 180, 10, 10);
rect(x + 120, y + 180, 60, 10);
rect(x + 90, y + 190, 90, 10);
rect(x + 90, y + 200, 20, 10);
rect(x + 120, y + 200, 60, 20);
rect(x + 140, y + 220, 40, 10);
rect(x + 150, y + 230, 30, 10);
rect(x + 160, y + 240, 10, 10);

//Skin
//Arm
fill(231, 188, 145);
rect(x + 150, y + 150, 10, 80);
rect(x + 140, y + 160, 30, 60);

fill(243, 213, 181);
rect(x + 150, y + 170, 20, 50);

//Leg
fill(231, 188, 145);
rect(x + 120, y + 230, 20, 10);
rect(x + 120, y + 240, 30, 10);
rect(x + 110, y + 250, 50, 10);
rect(x + 110, y + 260, 40, 20);
rect(x + 100, y + 280, 40, 10);
rect(x + 100, y + 290, 30, 10);
rect(x + 100, y + 300, 20, 10);

fill(243, 213, 181);
rect(x + 140, y + 250, 10, 30);
rect(x + 130, y + 260, 10, 30);
rect(x + 120, y + 280, 10, 20);

//Head
fill(231, 188, 145);
rect(x + 110, y + 80, 100, 60);
rect(x + 170, y + 140, 30, 10);

fill(243, 213, 181);
rect(x + 170, y + 110, 20, 30);
rect(x + 190, y + 100, 10, 10);
rect(x + 160, y + 120, 10, 10);
rect(x + 120, y + 110, 10, 10);

//Eyes
fill(255, 255, 255);
rect(x + 180, y + 110, 10, 20);

fill(76, 42, 13);
rect(x + 190, y + 110, 10, 20);

//Hair (dark)
fill(116, 71, 50);
rect(x + 130, y + 30, 70, 10);
rect(x + 110, y + 40, 100, 10);
rect(x + 100, y + 50, 120, 10);
rect(x + 100, y + 60, 130, 10);
rect(x + 90, y + 70, 140, 10);
rect(x + 90, y + 80, 90, 10);
rect(x + 200, y + 80, 30, 10);
rect(x + 70, y + 90, 110, 10);
rect(x + 210, y + 90, 30, 10);
rect(x + 210, y + 100, 20, 10);
rect(x + 80, y + 100, 30, 10);
rect(x + 130, y + 100, 40, 10);
rect(x + 90, y + 110, 30, 10);
rect(x + 140, y + 110, 10, 10);
rect(x + 100, y + 120, 50, 10);
rect(x + 110, y + 130, 30, 10);
rect(x + 120, y + 140, 10, 10);

//Hair (light)
fill(130, 85, 63);
rect(x + 150, y + 40, 30, 10);
rect(x + 130, y + 50, 80, 10);
rect(x + 120, y + 60, 60, 10);
rect(x + 200, y + 60, 20, 10);
rect(x + 110, y + 70, 60, 10);
rect(x + 210, y + 70, 10, 20);
rect(x + 100, y + 80, 70, 10);
rect(x + 100, y + 90, 10, 10);
rect(x + 130, y + 90, 20, 10);
rect(x + 90, y + 100, 10, 10);
rect(x + 100, y + 110, 10, 10);

//Hair (shine)
fill(162, 113, 89);
rect(x + 140, y + 60, 30, 10);
rect(x + 130, y + 70, 30, 10);
rect(x + 140, y + 80, 10, 10);
