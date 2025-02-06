import Sprite from './Sprite.js';

export default class Brick extends Sprite {
  constructor(x, y, width, height, color, status = 1) {
    super(x, y, width, height, color);
    this.status = status;
  }

  render(ctx) {
    if (this.status === 1) {
      super.render(ctx);
    }
  }
}
