import { AudioManager } from "../audioManager.js";
import { gGameConfig } from "../config/gameConfig.js";
import { ResourceManager } from "../resourceManager.js";
import { ParticleSystem } from "./particleSystem.js";
export var BRICK_COLORS;
(function (BRICK_COLORS) {
    BRICK_COLORS[BRICK_COLORS["blue"] = 0] = "blue";
    BRICK_COLORS[BRICK_COLORS["green"] = 1] = "green";
    BRICK_COLORS[BRICK_COLORS["red"] = 2] = "red";
    BRICK_COLORS[BRICK_COLORS["purple"] = 3] = "purple";
    BRICK_COLORS[BRICK_COLORS["gold"] = 4] = "gold";
})(BRICK_COLORS || (BRICK_COLORS = {}));
export const PALLETE_COLORS = [
    [99, 155, 255],
    [106, 190, 47],
    [217, 87, 99],
    [215, 123, 186],
    [251, 242, 54],
];
export class Brick {
    x;
    y;
    color;
    tier;
    width;
    height;
    image;
    inPlay = true;
    particleSystem;
    constructor(x, y, color = 0, tier = 0) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.tier = tier;
        this._setImage();
        this.particleSystem = new ParticleSystem(x, y, this.width, this.height);
    }
    _setImage() {
        this.image = ResourceManager.frames.bricks[this.color * 4 + this.tier];
        this.width = this.image.width * gGameConfig.viewport.scaler;
        this.height = this.image.height * gGameConfig.viewport.scaler;
    }
    setImage(color, tier) {
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
    update(dt) {
        this.particleSystem.update(dt);
    }
    draw(ctx) {
        if (this.inPlay) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        this.particleSystem.draw(ctx);
    }
}
