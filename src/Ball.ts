import Sprite from "./sprite";
import Paddle from "./Paddle"; // Adjust the import path as necessary

export default class Ball extends Sprite {
  radius: number;
  dx: number;
  dy: number;
  baseSpeed: number;
  maxSpeed: number;

  constructor(
    x: number,
    y: number,
    radius: number,
    dx: number,
    dy: number,
    color = "#FFD700",
    maxSpeed = 5
  ) {
    super(x, y, radius * 2, radius * 2, color);
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.baseSpeed = Math.sqrt(dx ** 2 + dy ** 2);
    this.maxSpeed = maxSpeed;
  }

  move(): void {
    this.x += this.dx;
    this.y += this.dy;
  }

  increaseSpeed(score: number): void {
    const speedFactor = 1 + score * 0.001;
    const newSpeed = Math.min(this.maxSpeed, this.baseSpeed * speedFactor);
    const angle = Math.atan2(this.dy, this.dx);
    this.dx = newSpeed * Math.cos(angle);
    this.dy = newSpeed * Math.sin(angle);
  }

  bounceOffPaddle(paddle: Paddle): boolean {
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
    return true;
  }
}