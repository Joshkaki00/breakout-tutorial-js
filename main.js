import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Background from './Background.js';
import Score from './Score.js';
import Lives from './Lives.js';
import Brick from './Brick.js';

/* eslint-disable no-undef */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ball = new Ball(canvas.width / 2, canvas.height - 30, 10, 2, -2);
const paddle = new Paddle((canvas.width - 75) / 2, canvas.height - 10, 75, 10);
const background = new Background('#8A2BE2', '#000000');
const score = new Score(8, 20);
const lives = new Lives(canvas.width - 65, 20);

const brickRowCount = 5;
const brickColumnCount = 8;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
// eslint-disable-next-line max-len
const brickWidth = (canvas.width - (brickOffsetLeft * 2) - (brickColumnCount - 1) * brickPadding) / brickColumnCount;
const brickHeight = 20;

const bricks = [];
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
    const brickColor = ['#FF5733', '#33FF57', '#3357FF', '#FFD700', '#FF69B4'][
      r % 5
    ];
    bricks[c][r] = new Brick(brickX, brickY, brickWidth, brickHeight, brickColor);
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (
          ball.x > b.x
          && ball.x < b.x + b.width
          && ball.y > b.y
          && ball.y < b.y + b.height
        ) {
          ball.dy = -ball.dy;
          b.status = 0;
          score.update(10);
        }
      }
    }
  }
}

function draw() {
  background.render(ctx, canvas);

  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      bricks[c][r].render(ctx);
    }
  }

  ball.render(ctx);
  paddle.render(ctx);
  score.render(ctx);
  lives.render(ctx);

  collisionDetection();

  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
    } else {
      lives.loseLife();
      if (!lives.lives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 2;
        ball.dy = -2;
        paddle.x = (canvas.width - paddle.width) / 2;
      }
    }
  }

  ball.move();
  requestAnimationFrame(draw);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.x = Math.min(paddle.x + 7, canvas.width - paddle.width);
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.x = Math.max(paddle.x - 7, 0);
  }
});

draw();
