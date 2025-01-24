/* eslint-disable no-undef */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

const brickRowCount = 3; // Number of brick rows
const brickColumnCount = 5; // Number of brick columns
const brickWidth = 75; // Width of each brick
const brickHeight = 20; // Height of each brick
const brickPadding = 10; // Space between bricks
const brickOffsetTop = 30; // Space between the top of the canvas and the first row of bricks
const brickOffsetLeft = 30; // Space between the left side of the canvas
// and the first column of bricks

const bricks = [];
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
    // Initialize each brick with default coordinates and status
  }
}

let score = 0;
let rightPressed = false;
let leftPressed = false;

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) { // Only draw active bricks
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = '#0095DD'; // Brick color
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  // Position at bottom of canvas
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD'; // Paddle color
  ctx.fill();
  ctx.closePath();
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r]; // Get each brick object
      if (b.status === 1) { // Only check active bricks
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy; // Reverse direction upon collision
          b.status = 0; // Mark brick as destroyed
          score += 1; // Increment score
          if (score === brickRowCount * brickColumnCount) {
            const winMessage = document.createElement('div');
            winMessage.innerText = 'YOU WIN!';
            winMessage.style.position = 'absolute';
            winMessage.style.top = '50%';
            winMessage.style.left = '50%';
            winMessage.style.transform = 'translate(-50%, -50%)';
            winMessage.style.backgroundColor = '#0095DD';
            winMessage.style.color = '#fff';
            winMessage.style.padding = '20px';
            winMessage.style.borderRadius = '10px';
            document.body.appendChild(winMessage);
            document.location.reload();
          }
        }
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  drawBricks(); // Draw the brick field
  drawBall(); // Draw the ball
  drawPaddle(); // Draw the paddle
  collisionDetection(); // Check for collisions

  // Paddle movement logic
  if (rightPressed) {
    paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
  } else if (leftPressed) {
    paddleX = Math.max(paddleX - 7, 0);
  }

  // Ball collision logic
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      const gameOverMessage = document.createElement('div');
      gameOverMessage.innerText = 'GAME OVER';
      gameOverMessage.style.position = 'absolute';
      gameOverMessage.style.top = '50%';
      gameOverMessage.style.left = '50%';
      gameOverMessage.style.transform = 'translate(-50%, -50%)';
      gameOverMessage.style.backgroundColor = '#FF0000';
      gameOverMessage.style.color = '#fff';
      gameOverMessage.style.padding = '20px';
      gameOverMessage.style.borderRadius = '10px';
      document.body.appendChild(gameOverMessage);
      clearInterval(interval);
    }
  }

  x += dx; // Update ball's x position
  y += dy; // Update ball's y position
}

setInterval(draw, 10);
