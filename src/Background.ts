export default class Background {
  constructor(private color1: string, private color2: string) {}

  render(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      50,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width
    );
    gradient.addColorStop(0, this.color1);
    gradient.addColorStop(1, this.color2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}