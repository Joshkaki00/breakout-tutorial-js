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

  move(canvas) {
    // Bounce off walls
    if (this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius) {
      this.dx = -this.dx;
    }
    if (this.y + this.dy > canvas.height - this.radius || this.y + this.dy < this.radius) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
  }

  increaseSpeed(score) {
    const speedFactor = 1 + score * 0.010; // Gradual increase over time
    const newSpeed = Math.min(this.maxSpeed, this.baseSpeed * speedFactor);
    const angle = Math.atan2(this.dy, this.dx);
    this.dx = newSpeed * Math.cos(angle);
    this.dy = newSpeed * Math.sin(angle);
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
