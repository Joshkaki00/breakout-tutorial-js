/* eslint-disable no-undef */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;

// Generate a random starting angle for the ball
const initialAngle = (Math.random() * Math.PI) / 4 + Math.PI / 4; // Between 45 and 135 degrees
const baseSpeed = 2;
let speed = baseSpeed;
const maxSpeed = 5; // Set maximum speed limit
let dx = speed * Math.cos(initialAngle);
let dy = -speed * Math.sin(initialAngle);

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

const brickRowCount = 5;
const brickColumnCount = 8;
const brickColors = ['#FF5733', '#33FF57', '#3357FF', '#FFD700', '#FF69B4', '#40E0D0'];

const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
// eslint-disable-next-line max-len
const brickWidth = (canvas.width - (brickOffsetLeft * 2) - ((brickColumnCount - 1) * brickPadding)) / brickColumnCount;
const bricks = [];
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
    bricks[c][r] = { x: brickX, y: brickY, status: 1 };
  }
}
const brickPoints = [10, 20, 30, 40, 50, 60];

let score = 0;
let lives = 3;
let rightPressed = false;
let leftPressed = false;

// Load sound effects
const brickHitSound = new Audio('assets/sounds/brick-hit.mp3');
const paddleHitSound = new Audio('assets/sounds/paddle-hit.mp3');
const gameOverSound = new Audio('assets/sounds/game-over.mp3');
const ballMissSound = new Audio('assets/sounds/ball-miss.mp3'); // New sound for ball hitting the bottom

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

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        const brick = bricks[c][r];
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brickWidth, brickHeight);
        ctx.fillStyle = brickColors[r % brickColors.length];
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#FFD700';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#40E0D0';
  ctx.fill();
  ctx.closePath();
}

function collisionDetection() {
  let bricksRemaining = 0;
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === 1) {
        bricksRemaining += 1;
        // eslint-disable-next-line max-len
        if (x + ballRadius > b.x && x - ballRadius < b.x + brickWidth && y + ballRadius > b.y && y - ballRadius < b.y + brickHeight) {
          const overlapX = Math.min(x + ballRadius - b.x, b.x + brickWidth - (x - ballRadius));
          const overlapY = Math.min(y + ballRadius - b.y, b.y + brickHeight - (y - ballRadius));

          if (overlapX < overlapY) {
            dx = -dx; // Reflect horizontally
          } else if (overlapY < overlapX) {
            dy = -dy; // Reflect vertically
          } else {
            // Corner case: Reflect both horizontally and vertically
            dx = -dx;
            dy = -dy;
          }

          b.status = 0;
          score += brickPoints[r % brickPoints.length];
          brickHitSound.play();

          // Gradually increase speed after breaking bricks, up to maxSpeed
          speed = Math.min(maxSpeed, baseSpeed + Math.floor(score / 100) * 0.5);
          dx = (dx > 0 ? 1 : -1) * speed * Math.cos(Math.atan2(dy, dx));
          dy = (dy > 0 ? 1 : -1) * speed * Math.sin(Math.atan2(dy, dx));
        }
      }
    }
  }
  if (bricksRemaining === 0) {
    winSound.play();
    const playAgain = confirm('Congratulations! You won! Do you want to play again?');
    if (playAgain) {
      document.location.reload();
    } else {
      alert('Thank you for playing!');
    }
  }
}

function dynamicPaddleCollision() {
  const paddleTop = canvas.height - paddleHeight;
  const paddleBottom = paddleTop + paddleHeight;
  const paddleLeft = paddleX;
  const paddleRight = paddleX + paddleWidth;

  // eslint-disable-next-line max-len
  if (y + ballRadius >= paddleTop && y + ballRadius <= paddleBottom && x >= paddleLeft && x <= paddleRight) {
    const relativeIntersectX = x - (paddleX + paddleWidth / 2);
    const normalizedRelativeIntersectX = relativeIntersectX / (paddleWidth / 2);

    if (Math.abs(normalizedRelativeIntersectX) < 0.2) {
      // Center hit, reflect directly vertically
      dy = -Math.abs(dy);
    } else {
      // Side hit, calculate bounce angle
      // eslint-disable-next-line max-len
      const bounceAngle = normalizedRelativeIntersectX * (Math.PI / 3); // Max bounce angle: 60 degrees
      dx = speed * Math.cos(bounceAngle);
      dy = -Math.abs(speed * Math.sin(bounceAngle));
    }

    paddleHitSound.play();
  }
}

function drawBackground() {
  // eslint-disable-next-line max-len
  const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 50, canvas.width / 2, canvas.height / 2, canvas.width);
  gradient.addColorStop(0, '#8A2BE2');
  gradient.addColorStop(1, '#000000');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  drawBackground();
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  dynamicPaddleCollision();

  if (rightPressed) {
    paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
  } else if (leftPressed) {
    paddleX = Math.max(paddleX - 7, 0);
  }

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      ballMissSound.play(); // Play sound when ball hits the bottom
      lives -= 1;
      if (!lives) {
        gameOverSound.play();
        const playAgain = confirm('GAME OVER. Do you want to play again?');
        if (playAgain) {
          document.location.reload();
        } else {
          alert('Thank you for playing!');
          return;
        }
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        const newAngle = (Math.random() * Math.PI) / 4 + Math.PI / 4;
        dx = speed * Math.cos(newAngle);
        dy = -speed * Math.sin(newAngle);
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  x += dx;
  y += dy;

  requestAnimationFrame(draw);
}

draw();
