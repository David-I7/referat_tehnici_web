import { gGameConfig } from "./dependencies.js";
import { Brick } from "./entities/brick.js";
import { randBool, randInt } from "./utils/random.js";
export class LevelMaker {
    static createLevel(level) {
        const bricks = [];
        // randomly choose the number of rows
        const numRows = randInt(1, 6);
        // randomly choose the number of columns, ensuring odd
        let numCols = randInt(7, 13);
        if (numCols % 2 === 0)
            numCols += 1;
        // highest possible spawned brick tier (max 3)
        const highestTier = Math.min(3, Math.floor(level / 2));
        // highest color of the highest tier (max 5)
        const highestColor = 4;
        // lay out bricks
        const brickWidth = gGameConfig.viewport.scaler * 32;
        const brickHeight = gGameConfig.viewport.scaler * 16;
        const startX = gGameConfig.viewport.width / 2 - (brickWidth * numCols) / 2;
        const startY = 80;
        // Responsive design
        if (startX + brickWidth * numCols > gGameConfig.viewport.width - 64 ||
            startY + brickHeight * numRows > gGameConfig.viewport.height - 220) {
            return LevelMaker.createLevel(level);
        }
        for (let y = 0; y < numRows; y++) {
            const skipPattern = randBool();
            const alternatePattern = randBool();
            const alternateColor1 = randInt(0, highestColor);
            const alternateColor2 = randInt(0, highestColor);
            const alternateTier1 = randInt(0, highestTier);
            const alternateTier2 = randInt(0, highestTier);
            let skipFlag = randBool();
            let alternateFlag = randBool();
            const solidColor = randInt(0, highestColor);
            const solidTier = randInt(0, highestTier);
            for (let x = 0; x < numCols; x++) {
                // skip logic
                if (skipPattern && skipFlag) {
                    skipFlag = !skipFlag;
                    continue;
                }
                skipFlag = !skipFlag;
                const brick = new Brick(startX + x * brickWidth, startY + y * brickHeight);
                if (alternatePattern) {
                    if (alternateFlag) {
                        brick.setImage(alternateColor1, alternateTier1);
                    }
                    else {
                        brick.setImage(alternateColor2, alternateTier2);
                    }
                    alternateFlag = !alternateFlag;
                }
                else {
                    brick.setImage(solidColor, solidTier);
                }
                bricks.push(brick);
            }
        }
        // if no bricks were generated, retry
        return bricks.length === 0 ? LevelMaker.createLevel(level) : bricks;
    }
}
