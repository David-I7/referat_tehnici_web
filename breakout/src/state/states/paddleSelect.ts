import {
  gGameConfig,
  gInputManager,
  gStateMachine,
  ResourceManager,
} from "../../dependencies.js";
import { Ball } from "../../entities/ball.js";
import { LevelState } from "../../entities/levelState.js";
import { Paddle } from "../../entities/paddle.js";
import { LevelMaker } from "../../levelMaker.js";
import State from "./state.js";

export class PaddleSelect implements State {
  paddleSkin = 0;
  paddleSize = 1;
  maxPaddleSkin = 4;
  update(dt: number): void {
    if (gInputManager.keyboard.wasPressed("ArrowRight")) {
      if (this.paddleSkin < this.maxPaddleSkin - 1) {
        ++this.paddleSkin;
        ResourceManager.sounds.select.play();
      } else {
        ResourceManager.sounds["no-select"].play();
      }
    } else if (gInputManager.keyboard.wasPressed("ArrowLeft")) {
      if (this.paddleSkin != 0) {
        --this.paddleSkin;
        ResourceManager.sounds.select.play();
      } else {
        ResourceManager.sounds["no-select"].play();
      }
    } else if (gInputManager.keyboard.wasPressed("Escape")) {
      gStateMachine.change("start");
    }

    if (gInputManager.keyboard.wasPressed("Enter")) {
      ResourceManager.sounds.confirm.play();
      const levelState: LevelState = {
        ball: Ball.empty(),
        hearts: 3,
        level: 1,
        recoverPoints: 5000,
        score: 0,
        bricks: LevelMaker.createLevel(1),
        paddle: new Paddle(
          ResourceManager.frames.paddles[
            this.paddleSkin * this.maxPaddleSkin + this.paddleSize
          ]
        ),
      };
      gStateMachine.change("serve", levelState);
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.font = gGameConfig.font.family.primary.medium;
    ctx.textAlign = "center";
    ctx.fillStyle = gGameConfig.font.color.primary;
    ctx.fillText(
      "Select your paddle with left and right!",
      gGameConfig.viewport.width / 2,
      gGameConfig.viewport.height / 3
    );

    ctx.font = gGameConfig.font.family.primary.small;
    ctx.fillText(
      "(Press Enter to continue!)",
      gGameConfig.viewport.width / 2,
      gGameConfig.viewport.height / 3 + 32
    );

    const paddleImg =
      ResourceManager.frames.paddles[
        this.paddleSkin * this.maxPaddleSkin + this.paddleSize
      ];
    const paddleW = paddleImg.width * gGameConfig.viewport.scaler;
    const paddleH = paddleImg.height * gGameConfig.viewport.scaler;
    ctx.drawImage(
      paddleImg,
      gGameConfig.viewport.width / 2 - paddleW / 2,
      (gGameConfig.viewport.height / 3) * 2,
      paddleW,
      paddleH
    );

    const arrowImageLeft = ResourceManager.frames.arrows[0];
    const arrowImageRight = ResourceManager.frames.arrows[1];
    const arrowW = arrowImageLeft.width * gGameConfig.viewport.scaler;
    const arrowH = arrowImageLeft.height * gGameConfig.viewport.scaler;

    if (this.paddleSkin == 0) {
      ctx.globalAlpha = 0.5;
    }
    ctx.drawImage(
      arrowImageLeft,
      gGameConfig.viewport.width / 2 - 200 - 20 * this.paddleSize,
      (gGameConfig.viewport.height / 3) * 2 - (arrowH - paddleH) / 2,
      arrowW,
      arrowH
    );
    ctx.globalAlpha = 1;
    if (this.paddleSkin == this.maxPaddleSkin - 1) {
      ctx.globalAlpha = 0.5;
    }
    ctx.drawImage(
      arrowImageRight,
      gGameConfig.viewport.width / 2 + 200 - arrowW + 20 * this.paddleSize,
      (gGameConfig.viewport.height / 3) * 2 - (arrowH - paddleH) / 2,
      arrowW,
      arrowH
    );
    ctx.globalAlpha = 1;
  }

  async enter(enterParams?: Record<string, any>): Promise<void> {
    await ResourceManager.awaitLoad();
  }
  exit(): void {}
}
