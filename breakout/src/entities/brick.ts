import { gGameConfig } from "../dependencies.js";
import Animatable from "../interfaces/animatable.js";
import Drawable from "../interfaces/drawable.js";
import { ResourceManager } from "../resourceManager.js";

export class Brick implements Animatable, Drawable {
  width!: number;
  height!: number;
  image!: ImageBitmap;
  inPlay: boolean = true;

  constructor(
    public x: number,
    public y: number,
    public color: number = 0,
    public tier: number = 0
  ) {
    this._setImage();
  }

  private _setImage() {
    this.image = ResourceManager.frames.bricks[this.color * 4 + this.tier];
    this.width = this.image.width * gGameConfig.viewport.scaler;
    this.height = this.image.height * gGameConfig.viewport.scaler;
  }

  setImage(color: number, tier: number) {
    this.color = color;
    this.tier = tier;
    this._setImage();
  }

  hit() {
    ResourceManager.sounds["brick-hit-2"].play();
    --this.color;
    if (this.color < 0) {
      --this.tier;
      this.color = 4;
    }
    if (this.tier < 0) {
      ResourceManager.sounds["brick-hit-1"].play();
      this.inPlay = false;
      return;
    }
    this.setImage(this.color, this.tier);
  }

  update(dt: number): void {}
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
