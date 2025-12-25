import { gGameConfig, gInputManager } from "../dependencies.js";
export class Paddle {
    image;
    x;
    y;
    width;
    height;
    vx = 0;
    constructor(image, x, y) {
        this.image = image;
        this.width = image.width * gGameConfig.viewport.scaler;
        this.height = image.height * gGameConfig.viewport.scaler;
        this.x = x ? x : gGameConfig.viewport.width / 2 - this.width / 2;
        this.y = y ? y : gGameConfig.viewport.height - 80;
    }
    update(dt) {
        if (gInputManager.keyboard.isDown("ArrowLeft") && this.x > 0) {
            this.vx = -300;
        }
        else if (gInputManager.keyboard.isDown("ArrowRight")) {
            this.vx = 300;
        }
        else {
            this.vx = 0;
        }
        this.x += this.vx * dt;
        this.x = Math.max(0, Math.min(gGameConfig.viewport.width - this.width, this.x));
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
