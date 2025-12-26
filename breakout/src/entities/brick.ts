import { AudioManager } from "../audioManager.js";
import { gGameConfig } from "../config/gameConfig.js";
import Animatable from "../interfaces/animatable.js";
import Drawable from "../interfaces/drawable.js";
import { ResourceManager } from "../resourceManager.js";
import { ParticleSystem } from "./particleSystem.js";

export enum BRICK_COLORS {
  blue = 0,
  green = 1,
  red = 2,
  purple = 3,
  gold = 4,
}

export const PALLETE_COLORS = [
  [99, 155, 255],
  [106, 190, 47],
  [217, 87, 99],
  [215, 123, 186],
  [251, 242, 54],
];

export class Brick implements Animatable, Drawable {
  width!: number;
  height!: number;
  image!: ImageBitmap;
  inPlay: boolean = true;
  particleSystem: ParticleSystem;

  constructor(
    public x: number,
    public y: number,
    public color: number = 0,
    public tier: number = 0
  ) {
    this._setImage();
    this.particleSystem = new ParticleSystem(x, y, this.width, this.height);
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
    AudioManager.play("brick-hit-2");
    this.particleSystem.start(this.color);
    --this.color;
    if (this.color < 0) {
      --this.tier;
      this.color = 4;
    }
    if (this.tier < 0) {
      AudioManager.play("brick-hit-1");
      this.inPlay = false;
      return;
    }
    this.setImage(this.color, this.tier);
  }

  update(dt: number): void {
    this.particleSystem.update(dt);
  }
  draw(ctx: CanvasRenderingContext2D): void {
    if (this.inPlay) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    this.particleSystem.draw(ctx);
  }
}
