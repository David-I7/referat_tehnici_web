export default interface Animatable {
  draw(ctx: CanvasRenderingContext2D, ...args: any[]): void;
  update(dt: number, ...args: any[]): void;
}
