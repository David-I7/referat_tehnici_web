export default interface State {
  draw(ctx: CanvasRenderingContext2D): void;
  update(dt: number): void;
  enter(enterParams?: Record<string, any>): void;
  exit(): void;
}
