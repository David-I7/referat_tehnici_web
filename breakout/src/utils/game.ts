import { gGameConfig } from "../config/gameConfig.js";

export function drawScore(ctx: CanvasRenderingContext2D, score: number) {
  ctx.textAlign = "left";
  ctx.font = gGameConfig.font.family.primary.small;
  ctx.fillStyle = gGameConfig.font.color.primary;
  const text = `Score: ${score}`;
  const metrics = ctx.measureText(text);
  ctx.fillText(text, gGameConfig.viewport.width - metrics.width - 32, 32);
}
