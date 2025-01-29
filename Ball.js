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
        // Center hit → Reflect directly upwards
        this.dy = -Math.abs(this.dy);
      } else {
        // Side hit → Adjust bounce angle
        // eslint-disable-next-line max-len
        const bounceAngle = normalizedRelativeIntersectX * (Math.PI / 3); // Max bounce angle: 60 degrees
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
