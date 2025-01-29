export default class Paddle {
  constructor(x, y, width, height, canvas, color = '#40E0D0') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.speed = 7;
    this.color = color;
    this.rightPressed = false;
    this.leftPressed = false;
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
  }

  handleKeyDown(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  handleKeyUp(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  handleMouseMove(e) {
    const relativeX = e.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.x = relativeX - this.width / 2;
      console.log(`Mouse Move: Paddle X Position = ${this.x}`);
    }
  }

  move() {
    if (this.rightPressed) {
      this.x = Math.min(this.x + this.speed, this.canvas.width - this.width);
    } else if (this.leftPressed) {
      this.x = Math.max(this.x - this.speed, 0);
    }
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
