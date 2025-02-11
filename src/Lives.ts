export default class Lives {
  constructor(
    public x: number,
    public y: number,
    public color: string = "#0095DD",
    public font: string = "16px Arial",
    public lives: number = 3
  ) {}

  loseLife(): void {
    this.lives -= 1;
  }

  reset(): void {
    this.lives = 3;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);
  }
}