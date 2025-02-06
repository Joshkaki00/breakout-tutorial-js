import Sprite from './Sprite.js';

export default class Ball extends Sprite {
  constructor(x, y, radius, dx, dy, color = '#FFD700', maxSpeed = 5) {
    super(x, y, radius * 2, radius * 2, color);
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.baseSpeed = Math.sqrt(dx ** 2 + dy ** 2);
    this.maxSpeed = maxSpeed;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  increaseSpeed(score) {
    const speedFactor = 1 + score * 0.001;
    const newSpeed = Math.min(this.maxSpeed, this.baseSpeed * speedFactor);
    const angle = Math.atan2(this.dy, this.dx);
    this.dx = newSpeed * Math.cos(angle);
    this.dy = newSpeed * Math.sin(angle);
  }

  bounceOffPaddle(paddle) {
    const paddleTop = paddle.y;
    const paddleBottom = paddle.y + paddle.height;
    const paddleLeft = paddle.x;
    const paddleRight = paddle.x + paddle.width;

    if (
      this.y + this.radius >= paddleTop
      && this.y + this.radius <= paddleBottom
      && this.x >= paddleLeft
      && this.x <= paddleRight
    ) {
      const relativeIntersectX = this.x - (paddle.x + paddle.width / 2);
      const normalizedRelativeIntersectX = relativeIntersectX / (paddle.width / 2);

      if (Math.abs(normalizedRelativeIntersectX) < 0.2) {
        this.dy = -Math.abs(this.dy);
      } else {
        const bounceAngle = normalizedRelativeIntersectX * (Math.PI / 3);
        const speed = Math.sqrt(this.dx ** 2 + this.dy ** 2);
        this.dx = speed * Math.cos(bounceAngle);
        this.dy = -Math.abs(speed * Math.sin(bounceAngle));
      }
    }
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
