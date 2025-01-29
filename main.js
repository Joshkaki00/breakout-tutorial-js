import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Background from './Background.js';
import Score from './Score.js';
import Lives from './Lives.js';
import Brick from './Brick.js';
import GameManager from './GameManager.js';

/* eslint-disable no-undef */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ball = new Ball(canvas.width / 2, canvas.height - 30, 10, 2, -2, '#FFD700', 5, canvas);
const paddle = new Paddle((canvas.width - 75) / 2, canvas.height - 10, 75, 10, canvas);
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

// eslint-disable-next-line max-len
const bricks = Array.from({ length: brickColumnCount }, (_, c) => Array.from({ length: brickRowCount }, (_, r) => new Brick(
  c * (brickWidth + brickPadding) + brickOffsetLeft,
  r * (brickHeight + brickPadding) + brickOffsetTop,
  brickWidth,
  brickHeight,
  ['#FF5733', '#33FF57', '#3357FF', '#FFD700', '#FF69B4'][r % 5],
)));

const gameManager = new GameManager(ball, paddle, bricks, score, lives, canvas);

document.addEventListener('keydown', (e) => paddle.handleKeyDown(e));
document.addEventListener('keyup', (e) => paddle.handleKeyUp(e));
document.addEventListener('mousemove', (e) => paddle.handleMouseMove(e));

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Render all components
  background.render(ctx, canvas);
  paddle.render(ctx);
  ball.render(ctx);
  score.render(ctx);
  lives.render(ctx);
  bricks.flat().forEach((brick) => brick.render(ctx));

  // Ball-wall collision detection
  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx; // Reverse horizontal direction
  }

  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy; // Reverse vertical direction
  }

  // Ball hitting the bottom wall
  if (ball.y + ball.dy > canvas.height - ball.radius) {
    lives.loseLife();
    if (lives.lives === 0) {
      alert("Game Over");
      document.location.reload(); // Reset the game
    } else {
      // Reset ball and paddle
      ball.x = canvas.width / 2;
      ball.y = canvas.height - 30;
      ball.dx = 2;
      ball.dy = -2;
      paddle.x = (canvas.width - paddle.width) / 2;
    }
  }

  // Ball movement
  ball.move();
  paddle.move();

  // Collision detection for bricks and paddle
  gameManager.collisionDetection();
  gameManager.checkGameOver();

  requestAnimationFrame(gameLoop);
}

gameLoop();
