import Animatable from "../interfaces/animatable.js";

export class Particle implements Animatable {
  vy: number = 25;
  constructor(public r: number, public x: number, public y: number) {}
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
  update(dt: number): void {
    this.y += this.vy * dt;
  }
}
