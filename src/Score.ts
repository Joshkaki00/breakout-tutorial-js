export default class Score {
  constructor(
    public x: number,
    public y: number,
    public color: string = "#0095DD",
    public font: string = "16px Arial",
    public score: number = 0
  ) {}

  update(points: number): void {
    this.score += points;
  }

  reset(): void {
    this.score = 0;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Score: ${this.score}`, this.x, this.y);
  }
}