import { gGameConfig } from "../config/gameConfig.js";
import Animatable from "../interfaces/animatable.js";
import Drawable from "../interfaces/drawable.js";
import { AudioManager } from "../audioManager.js";

export class Ball implements Drawable, Animatable {
  private static _empty: Ball = new Ball({} as ImageBitmap);
  x: number = 0;
  y: number = 0;
  width: number;
  height: number;
  vx: number = 0;
  vy: number = 0;

  constructor(public image: ImageBitmap, x?: number, y?: number) {
    this.width = image.width * gGameConfig.viewport.scaler;
    this.height = image.height * gGameConfig.viewport.scaler;
  }
  update(dt: number): void {
    this.x += this.vx * dt;
    if (this.x >= gGameConfig.viewport.width - this.width) {
      this.x = gGameConfig.viewport.width - this.width;
      this.vx *= -1;
      AudioManager.play("wall-hit");
    } else if (this.x <= 0) {
      this.x = 0;
      this.vx *= -1;
      AudioManager.play("wall-hit");
    }

    this.y += this.vy * dt;
    if (this.y <= 0) {
      this.y = 0;
      this.vy *= -1;
      AudioManager.play("wall-hit");
    }
  }
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  static empty(): Ball {
    return Ball._empty;
  }
}
