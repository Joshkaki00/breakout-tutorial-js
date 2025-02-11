import Ball from "./Ball";
import Paddle from "./Paddle";
import Brick from "./Brick";
import Score from "./Score";
import Lives from "./Lives";
import SoundManager from "./SoundManager";

export default class GameManager {
  isGameOver: boolean = false;
  isPaused: boolean = false;
  private flatBricks: Brick[];

  constructor(
    private ball: Ball,
    private paddle: Paddle,
    private bricks: Brick[][],
    private score: Score,
    private lives: Lives,
    private sounds: SoundManager,
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D
  ) {
    document.addEventListener("keydown", (e) => this.handlePause(e));
    this.sounds.startBackgroundMusic();
    this.flatBricks = this.bricks.flat(); // Optimized flattening
  }

  handlePause(e: KeyboardEvent): void {
    if (e.key === "p" || e.key === "P") {
      this.isPaused = !this.isPaused;
      if (this.isPaused) {
        this.sounds.stopBackgroundMusic();
      } else {
        this.sounds.startBackgroundMusic();
      }
    }
  }

  checkGameOver(): void {
    if (this.isPaused || this.isGameOver) return;

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

  resetBall(): void {
    this.ball.x = this.paddle.x + this.paddle.width / 2;
    this.ball.y = this.paddle.y - this.ball.radius - 5;
    this.ball.dx = 2 * (Math.random() < 0.5 ? 1 : -1);
    this.ball.dy = -2;
  }

  collisionDetection(): void {
    let hitBrick = false;
    this.flatBricks.forEach((brick) => {
      if (
        brick.status &&
        this.ball.x > brick.x &&
        this.ball.x < brick.x + brick.width &&
        this.ball.y > brick.y &&
        this.ball.y < brick.y + brick.height
      ) {
        this.ball.dy = -this.ball.dy;
        brick.status = false;
        this.score.update(10);
        hitBrick = true;
      }
    });

    if (hitBrick) {
      this.ball.increaseSpeed(this.score.score);
      this.sounds.play("brickHit");
    }
  }

  checkWinCondition(): void {
    if (this.flatBricks.every(brick => !brick.status)) {
      this.sounds.play("win");
      alert("YOU WIN!");
      this.isGameOver = true;
    }
  }
}