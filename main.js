const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

let interval = 0;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

const brickRowCount = 3;        // Number of brick rows
const brickColumnCount = 5;     // Number of brick columns
const brickWidth = 75;          // Width of each brick
const brickHeight = 20;         // Height of each brick
const brickPadding = 10;        // Space between bricks
const brickOffsetTop = 30;      // Space between the top of the canvas and the first row of bricks
const brickOffsetLeft = 30;     // Space between the left side of the canvas and the first column of bricks

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight); // Position at bottom of canvas
  ctx.fillStyle = "#0095DD"; // Paddle color
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  drawBall();    // Draw the ball
  drawPaddle();  // Draw the paddle

  // Paddle movement logic
  if (rightPressed) {
    paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
  } else if (leftPressed) {
    paddleX = Math.max(paddleX - 7, 0);
  }

  // Ball collision logic
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx; // Ball bounces off left/right walls
  }
  if (y + dy < ballRadius) {
    dy = -dy; // Ball bounces off the top wall
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy; // Ball bounces off the paddle
    } else {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval); // Stop the game loop
    }
  }

  x += dx; // Update ball's x position
  y += dy; // Update ball's y position
}

setInterval(draw, 10);