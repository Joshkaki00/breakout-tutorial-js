import {
  canvas,
  ctx,
  ball,
  paddle,
  background,
  score,
  lives,
  sounds,
  bricks,
  gameManager
} from './constants';

// Event Listeners for Paddle Movement
document.addEventListener('keydown', (e) => paddle.handleKeyDown(e));
document.addEventListener('keyup', (e) => paddle.handleKeyUp(e));
document.addEventListener('mousemove', (e) => paddle.handleMouseMove(e));

/**
 * Main game loop
 */
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Render game objects
  background.render(ctx, canvas);
  paddle.render(ctx);
  ball.render(ctx);
  score.render(ctx);
  lives.render(ctx);
  bricks.flat().forEach((brick) => brick.render(ctx));

  // Ball movement & wall collision
  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }

  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  }

  // Ball hitting the bottom (check game over)
  gameManager.checkGameOver();

  // Ball-Paddle Collision (Improved)
  if (ball.bounceOffPaddle(paddle)) {
    sounds.play('paddleHit'); // Play paddle hit sound
  }

  // Move ball and paddle
  ball.move();
  paddle.move();

  // Check for brick collisions
  gameManager.collisionDetection();

  // **Win Condition: Check if all bricks are broken**
  gameManager.checkWinCondition();

  requestAnimationFrame(gameLoop);
}

// Start game loop
gameLoop();
