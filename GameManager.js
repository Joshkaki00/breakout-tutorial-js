import { SoundManager } from './SoundManager.js';
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
    for (let c = 0; c < this.bricks.length; c += 1) {
      for (let r = 0; r < this.bricks[c].length; r += 1) {
        const brick = this.bricks[c][r];
        if (brick.status === 1
            && this.ball.x > brick.x && this.ball.x < brick.x + brick.width
            && this.ball.y > brick.y && this.ball.y < brick.y + brick.height) {
          this.ball.dy = -this.ball.dy;
          brick.status = 0;
          this.score.update(10);
          this.ball.increaseSpeed(this.score.score);
          this.sounds.play('brickHit');
        }
      }
    }
  }

  checkGameOver() {
    if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.bounceOffPaddle(this.paddle);
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
          this.ball.x = this.canvas.width / 2;
          this.ball.y = this.canvas.height - 30;
          this.paddle.x = (this.canvas.width - this.paddle.width) / 2;
        }
      }
    }
  }
}
