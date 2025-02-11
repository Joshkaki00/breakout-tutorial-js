// eslint-disable-next-line import/extensions
import SoundManager from './SoundManager.js';

export default class GameManager {
  constructor(ball, paddle, bricks, score, lives, canvas) {
    this.ball = ball;
    this.paddle = paddle;
    this.bricks = bricks;
    this.score = score;
    this.lives = lives;
    this.canvas = canvas;
    this.sounds = new SoundManager();
    this.sounds.startBackgroundMusic();
    this.flatBricks = this.bricks.flat(); // Optimized flattening
    this.isGameOver = false;
  }

  collisionDetection() {
    let hitBrick = false;
    this.flatBricks.forEach((brick) => {
      if (
        brick.status === 1 &&
        this.ball.x > brick.x &&
        this.ball.x < brick.x + brick.width &&
        this.ball.y > brick.y &&
        this.ball.y < brick.y + brick.height
      ) {
        this.ball.dy = -this.ball.dy;
        brick.status = 0;
        this.score.update(10);
        hitBrick = true;
      }
    });

    if (hitBrick) {
      this.ball.increaseSpeed(this.score.score);
      this.sounds.play("brickHit");
    }
  }

  checkGameOver() {
    if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
      if (this.ball.bounceOffPaddle(this.paddle)) {
        this.sounds.play("paddleHit");
      } else {
        this.lives.loseLife();
        this.sounds.play("ballMiss");

        if (this.lives.lives === 0) {
          this.sounds.stopBackgroundMusic();
          this.sounds.play("gameOver");
          this.isGameOver = true;
          alert("GAME OVER");
        } else {
          this.resetBall();
        }
      }
    }
  }
}
