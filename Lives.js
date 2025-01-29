export default class Lives {
  constructor(x, y, color = '#0095DD', font = '16px Arial', lives = 3) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = font;
    this.lives = lives;
  }

  loseLife() {
    this.lives -= 1;
  }

  reset() {
    this.lives = 3;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);
  }
}
