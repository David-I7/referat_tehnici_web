import { gGameConfig, gInputManager } from "../dependencies.js";
import Animatable from "../interfaces/animatable.js";
import Drawable from "../interfaces/drawable.js";

export class Paddle implements Drawable, Animatable {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number = 0;

  constructor(public image: ImageBitmap, x?: number, y?: number) {
    this.width = image.width * gGameConfig.viewport.scaler;
    this.height = image.height * gGameConfig.viewport.scaler;
    this.x = x ? x : gGameConfig.viewport.width / 2 - this.width / 2;
    this.y = y ? y : gGameConfig.viewport.height - 80;
  }
  update(dt: number): void {
    if (gInputManager.keyboard.isDown("ArrowLeft") && this.x > 0) {
      this.vx = -300;
    } else if (gInputManager.keyboard.isDown("ArrowRight")) {
      this.vx = 300;
    } else {
      this.vx = 0;
    }
    this.x += this.vx * dt;
    this.x = Math.max(
      0,
      Math.min(gGameConfig.viewport.width - this.width, this.x)
    );
  }
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
