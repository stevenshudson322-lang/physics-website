let x = 50;
let y = 50;
let speedX = 3;
let speedY = 2;

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(220);
  ellipse(x, y, 30, 30);

  x += speedX;
  y += speedY;

  if (x > width || x < 0) speedX *= -1;
  if (y > height || y < 0) speedY *= -1;
}

