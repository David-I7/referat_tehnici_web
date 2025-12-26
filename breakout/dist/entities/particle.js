export class Particle {
    r;
    x;
    y;
    vy = 25;
    constructor(r, x, y) {
        this.r = r;
        this.x = x;
        this.y = y;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    update(dt) {
        this.y += this.vy * dt;
    }
}
