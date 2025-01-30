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
  }

  collisionDetection() {
    let hitBrick = false;
    this.bricks.flat().forEach((brick) => {
      if (
        brick.status === 1
        && this.ball.x > brick.x
        && this.ball.x < brick.x + brick.width
        && this.ball.y > brick.y
        && this.ball.y < brick.y + brick.height
      ) {
        this.ball.dy = -this.ball.dy;
        const updatedBrick = brick;
        updatedBrick.status = 0;
        this.score.update(10);
        hitBrick = true;
      }
    });

    if (hitBrick) {
      this.ball.increaseSpeed(this.score.score);
      this.sounds.play('brickHit');
    }
  }

  checkGameOver() {
    if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
      if (this.ball.bounceOffPaddle(this.paddle)) {
        this.sounds.play('paddleHit');
      } else {
        this.lives.loseLife();
        this.sounds.play('ballMiss');

        if (this.lives.lives === 0) {
          this.sounds.stopBackgroundMusic();
          this.sounds.play('gameOver');
          alert('GAME OVER');
          document.location.reload();
        } else {
          this.resetBall();
        }
      }
    }
  }

  checkWinCondition() {
    if (this.bricks.flat().every((brick) => brick.status === 0)) {
      this.sounds.stopBackgroundMusic();
      this.sounds.play('win');
      setTimeout(() => {
        alert('YOU WIN! CONGRATULATIONS!');
        document.location.reload();
      }, 500);
    }
  }

  resetBall() {
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height / 1.5;
    this.paddle.x = (this.canvas.width - this.paddle.width) / 2;
    const angle = Math.random() * Math.PI / 4 - Math.PI / 8;
    const speedMultiplier = 1.05; // Slight speed increase after each reset
    // eslint-disable-next-line max-len
    const speed = Math.sqrt(this.ball.dx * this.ball.dx + this.ball.dy * this.ball.dy) * speedMultiplier;
    this.ball.dx = speed * Math.cos(angle);
    this.ball.dy = -speed * Math.sin(angle);
  }
}
