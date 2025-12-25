import State from "./state.js";

export default class EmptyState implements State {
  draw(ctx: CanvasRenderingContext2D): void {}
  update(dt: number): void {}
  enter(...args: any[]): void {}
  exit(): void {}
}
