import Sprite from './sprite.js';

export default class Paddle extends Sprite {
  constructor(x, y, width, height, canvas, color = '#40E0D0') {
    super(x, y, width, height, color);
    this.canvas = canvas;
    this.speed = 7;
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
    }
  }

  move() {
    if (this.rightPressed) {
      this.x = Math.min(this.x + this.speed, this.canvas.width - this.width);
    } else if (this.leftPressed) {
      this.x = Math.max(this.x - this.speed, 0);
    }
  }
}
