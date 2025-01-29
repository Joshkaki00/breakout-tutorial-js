export default class Paddle {
  constructor(x, y, width, height, canvasWidth, color = '#40E0D0') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.canvasWidth = canvasWidth;
    this.speed = 7;
    this.rightPressed = false;
    this.leftPressed = false;
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

  move() {
    if (this.rightPressed) {
      this.x = Math.min(this.x + this.speed, this.canvasWidth - this.width);
    } else if (this.leftPressed) {
      this.x = Math.max(this.x - this.speed, 0);
    }
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = '#40E0D0';
    ctx.fill();
    ctx.closePath();
  }
}
