import { gGameConfig } from "../config/gameConfig.js";
import { ResourceManager } from "../resourceManager.js";
export function drawStats(ctx, score, hearts) {
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.font = gGameConfig.font.family.primary.small;
    ctx.fillStyle = gGameConfig.font.color.primary;
    const text = `Score: ${score}`;
    const metrics = ctx.measureText(text);
    const textX = gGameConfig.viewport.width - metrics.width - 24;
    const textH = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    const fullHeart = ResourceManager.frames.hearts[0];
    const emptyHeart = ResourceManager.frames.hearts[1];
    const heartW = fullHeart.width * 2;
    const heartH = fullHeart.height * 2;
    let i = 1;
    for (; i <= hearts; ++i) {
        ctx.drawImage(fullHeart, textX - heartW * i - 10 - i * 2, 24 - (heartH - textH) / 2, heartW, heartH);
    }
    for (; i <= 3; ++i) {
        ctx.drawImage(emptyHeart, textX - heartW * i - 10 - i * 2, 24 - (heartH - textH) / 2, heartW, heartH);
    }
    ctx.fillText(text, gGameConfig.viewport.width - metrics.width - 24, 24);
    ctx.textBaseline = "alphabetic";
}
