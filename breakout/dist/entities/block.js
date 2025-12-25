import { ResourceManager } from "../resourceManager.js";
export class Brick {
    x;
    y;
    width;
    height;
    image;
    constructor(x, y, color, tier) {
        this.x = x;
        this.y = y;
        this.image = ResourceManager.frames.bricks[tier * 5 + color];
        this.width = this.image.width;
        this.height = this.image.height;
    }
    update(dt) { }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
