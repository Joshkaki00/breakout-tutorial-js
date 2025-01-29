export default class Score {
  constructor(x, y, color = '#0095DD', font = '16px Arial') {
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = font;
    this.score = 0;
  }

  update(points) {
    this.score += points;
  }

  reset() {
    this.score = 0;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Score: ${this.score}`, this.x, this.y);
  }
}
