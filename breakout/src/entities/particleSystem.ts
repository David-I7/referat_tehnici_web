import Animatable from "../interfaces/animatable.js";
import { randInt } from "../utils/random.js";
import { BRICK_COLORS, PALLETE_COLORS } from "./brick.js";
import { Particle } from "./particle.js";

type ParticleAnimationState = {
  duration: number;
  color: BRICK_COLORS;
  timer: number;
  particles: Particle[];
  opacity: number;
};

export class ParticleSystem implements Animatable {
  particleStates: ParticleAnimationState[] = [];
  offset: number = 15;
  particleCount: number = 100;
  particleRadius = 5;
  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number,
  ) {}

  draw(ctx: CanvasRenderingContext2D) {
    this.particleStates.forEach((state) => {
      state.particles.forEach((particle) => {
        ctx.globalAlpha = state.opacity;
        const rgb = PALLETE_COLORS[state.color];
        ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
        particle.draw(ctx);
      });
    });
    ctx.globalAlpha = 1;
  }
  update(dt: number) {
    for (let i = 0; i < this.particleStates.length; ++i) {
      const state = this.particleStates[i];

      state.timer += dt;
      state.opacity = Math.max(0, 0.5 - 0.5 * (state.timer / state.duration));

      if (state.opacity === 0) {
        this.particleStates.splice(i, 1);
        --i;
        continue;
      }

      state.particles.forEach((particle) => {
        particle.update(dt);
      });
    }
  }
  start(color: BRICK_COLORS) {
    const particleAnimationState: ParticleAnimationState = {
      duration: 1,
      timer: 0,
      color,
      particles: [],
      opacity: 0.5,
    };

    for (let i = 0; i < this.particleCount; ++i) {
      particleAnimationState.particles.push(
        new Particle(
          this.particleRadius,
          randInt(
            Math.floor(this.x - this.offset),
            Math.floor(this.x + this.w + this.offset),
          ),
          randInt(
            Math.floor(this.y - this.offset),
            Math.floor(this.y + this.h + this.offset),
          ),
        ),
      );
    }
    this.particleStates.push(particleAnimationState);
  }
}
