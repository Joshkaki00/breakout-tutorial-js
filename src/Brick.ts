import Sprite from "./sprite";

export default class Brick extends Sprite {
  status: boolean;

  constructor(x: number, y: number, width: number, height: number, color: string, status = true) {
    super(x, y, width, height, color);
    this.status = status;
  }
}