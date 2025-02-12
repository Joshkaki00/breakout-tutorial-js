import Sprite from "./sprite";

export default class Paddle extends Sprite {
  private canvas: HTMLCanvasElement;
  private speed: number = 7;
  private rightPressed: boolean = false;
  private leftPressed: boolean = false;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    canvas: HTMLCanvasElement,
    color: string = "#40E0D0"
  ) {
    super(x, y, width, height, color);
    this.canvas = canvas;

    document.addEventListener("keydown", (e) => this.handleKeyDown(e));
    document.addEventListener("keyup", (e) => this.handleKeyUp(e));
    this.canvas.addEventListener("mousemove", (e) => this.handleMouseMove(e));
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (e.key === "Right" || e.key === "ArrowRight") {
      this.rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      this.leftPressed = true;
    }
  }

  private handleKeyUp(e: KeyboardEvent): void {
    if (e.key === "Right" || e.key === "ArrowRight") {
      this.rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      this.leftPressed = false;
    }
  }

  private handleMouseMove(e: MouseEvent): void {
    const relativeX = e.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.x = relativeX - this.width / 2;
    }
  }

  move(): void {
    if (this.rightPressed) {
      this.x = Math.min(this.x + this.speed, this.canvas.width - this.width);
    } else if (this.leftPressed) {
      this.x = Math.max(this.x - this.speed, 0);
    }
  }
}