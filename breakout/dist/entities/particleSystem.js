import { randInt } from "../utils/random.js";
import { PALLETE_COLORS } from "./brick.js";
import { Particle } from "./particle.js";
export class ParticleSystem {
    x;
    y;
    w;
    h;
    particleStates = [];
    offset = 15;
    particleCount = 100;
    particleRadius = 5;
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    draw(ctx) {
        this.particleStates.forEach((state) => {
            state.particles.forEach((particle) => {
                ctx.globalAlpha = state.opacity;
                const rgb = PALLETE_COLORS[state.color];
                ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
                particle.draw(ctx);
                ctx.globalAlpha = 1;
            });
        });
    }
    update(dt) {
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
        this.particleStates.length ? console.log(this.particleStates) : undefined;
    }
    start(color) {
        const particleAnimationState = {
            duration: 1,
            timer: 0,
            color,
            particles: [],
            opacity: 0.5,
        };
        for (let i = 0; i < this.particleCount; ++i) {
            particleAnimationState.particles.push(new Particle(this.particleRadius, randInt(Math.floor(this.x - this.offset), Math.floor(this.x + this.w + this.offset)), randInt(Math.floor(this.y - this.offset), Math.floor(this.y + this.h + this.offset))));
        }
        this.particleStates.push(particleAnimationState);
    }
}
