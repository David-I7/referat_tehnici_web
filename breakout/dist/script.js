import "./dependencies.js";
import { displayFps, ResourceManager, gStateMachine, gGameConfig, gInputManager, } from "./dependencies.js";
window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    const CANVAS_WIDTH = (canvas.width = window.innerWidth);
    const CANVAS_HEIGHT = (canvas.height = window.innerHeight);
    gGameConfig.viewport.width = CANVAS_WIDTH;
    gGameConfig.viewport.height = CANVAS_HEIGHT;
    gGameConfig.viewport.dpi = window.devicePixelRatio;
    gGameConfig.viewport.scaler = gGameConfig.viewport.dpi * 2;
    const background = ResourceManager.graphics.background;
    const fps = displayFps("sec", { fillStyle: "white" });
    gStateMachine.change("start");
    let lastTime = 0;
    function animate(timestamp) {
        const dt = (timestamp - lastTime) / 1000;
        lastTime = timestamp;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(background, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fps(dt, ctx);
        gStateMachine.update(dt);
        gInputManager.update();
        gStateMachine.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});
