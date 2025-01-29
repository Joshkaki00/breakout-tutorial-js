export default class Background {
  constructor(color1, color2) {
    this.color1 = color1;
    this.color2 = color2;
  }

  render(ctx, canvas) {
    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      50,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width,
    );
    gradient.addColorStop(0, this.color1);
    gradient.addColorStop(1, this.color2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
