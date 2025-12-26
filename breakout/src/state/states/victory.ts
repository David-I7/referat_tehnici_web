import { gGameConfig } from "../../config/gameConfig.js";
import {
  AudioManager,
  gInputManager,
  gStateMachine,
} from "../../dependencies.js";
import { LevelState } from "../../entities/levelState.js";
import { LevelMaker } from "../../levelMaker.js";
import State from "./state.js";

export class VictoryState implements State {
  levelState: LevelState | null = null;
  update(dt: number): void {
    if (gInputManager.keyboard.wasPressed("Enter")) {
      AudioManager.play("confirm");
      gStateMachine.change("serve", {
        ...this.levelState,
        level: this.levelState!.level + 1,
        bricks: LevelMaker.createLevel(this.levelState!.level + 1),
        hearts: 3,
      } as LevelState);
      return;
    }
  }
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.font = gGameConfig.font.family.primary.large;
    ctx.fillStyle = gGameConfig.font.color.primary;
    ctx.textAlign = "center";
    ctx.fillText(
      `Level ${this.levelState!.level} Complete!`,
      gGameConfig.viewport.width / 2,
      gGameConfig.viewport.height / 3
    );
    ctx.font = gGameConfig.font.family.primary.medium;
    ctx.fillText(
      `Press Enter to Start Level ${this.levelState!.level + 1}`,
      gGameConfig.viewport.width / 2,
      gGameConfig.viewport.height / 2
    );
  }
  enter(enterParams: LevelState): void {
    this.levelState = enterParams;
  }
  exit(): void {}
}
