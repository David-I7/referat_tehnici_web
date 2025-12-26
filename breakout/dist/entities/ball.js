import { gGameConfig } from "../config/gameConfig.js";
import { AudioManager } from "../audioManager.js";
export class Ball {
    image;
    static _empty = new Ball({});
    x = 0;
    y = 0;
    width;
    height;
    vx = 0;
    vy = 0;
    constructor(image, x, y) {
        this.image = image;
        this.width = image.width * gGameConfig.viewport.scaler;
        this.height = image.height * gGameConfig.viewport.scaler;
    }
    update(dt) {
        this.x += this.vx * dt;
        if (this.x >= gGameConfig.viewport.width - this.width) {
            this.x = gGameConfig.viewport.width - this.width;
            this.vx *= -1;
            AudioManager.play("wall-hit");
        }
        else if (this.x <= 0) {
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
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    static empty() {
        return Ball._empty;
    }
}
