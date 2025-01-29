export default class Ball {
  constructor(x, y, radius, dx, dy, color = '#FFD700', maxSpeed = 5) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.baseSpeed = Math.sqrt(dx ** 2 + dy ** 2);
    this.maxSpeed = maxSpeed;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  increaseSpeed(score) {
    let speed = Math.min(this.maxSpeed, this.baseSpeed + Math.floor(score / 100) * 0.5);
    let angle = Math.atan2(this.dy, this.dx);
    this.dx = speed * Math.cos(angle);
    this.dy = speed * Math.sin(angle);
  }

  bounceOffPaddle(paddle) {
    const relativeIntersectX = this.x - (paddle.x + paddle.width / 2);
    const normalizedRelativeIntersectX = relativeIntersectX / (paddle.width / 2);
    const bounceAngle = normalizedRelativeIntersectX * (Math.PI / 3);
    const speed = Math.sqrt(this.dx ** 2 + this.dy ** 2);
    this.dx = speed * Math.cos(bounceAngle);
    this.dy = -Math.abs(speed * Math.sin(bounceAngle));
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
