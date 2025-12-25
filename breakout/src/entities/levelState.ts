import { Ball } from "./ball.js";
import { Brick } from "./brick.js";
import { Paddle } from "./paddle.js";

export type LevelState = {
  ball: Ball;
  paddle: Paddle;
  bricks: Brick[];
  hearts: number;
  score: number;
  recoverPoints: number;
  level: number;
};
