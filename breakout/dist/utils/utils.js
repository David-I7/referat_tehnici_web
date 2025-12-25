export function displayFps(unit = "sec", opt = {}) {
    let timer = 0;
    let cnt = 0;
    const interval = unit == "sec" ? 1 : 1000;
    let prevCnt = 0;
    return (dt, ctx) => {
        timer += dt;
        cnt++;
        if (timer >= interval) {
            timer = interval - timer;
            prevCnt = cnt;
            cnt = 0;
        }
        ctx.save();
        ctx.font = opt.font || "16px Helvetica";
        ctx.textAlign = "start";
        ctx.fillStyle = opt.fillStyle || "black";
        ctx.fillText(`FPS: ${prevCnt}`, opt.x || 24, opt.y || 24);
        ctx.restore();
    };
}
export function AABBColides(a, b) {
    return (a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y);
}
export function displayAudio(audio, opt) {
    let playing = false;
    audio.loop = true;
    window.addEventListener("click", (e) => {
        if (AABBColides(opt, { x: e.clientX, y: e.clientY, width: 1, height: 1 })) {
            playing = !playing;
            if (playing) {
                audio.currentTime = 0;
                audio.play();
            }
            else {
                audio.pause();
            }
        }
    });
    return (ctx) => {
        if (playing) {
            ctx.fillStyle = opt.fillStyle ? opt.fillStyle : "white";
            ctx.fillRect(opt.x, opt.y, opt.width, opt.height);
        }
        else {
            ctx.fillStyle = opt.fillStyle ? opt.fillStyle : "white";
            ctx.fillRect(opt.x, opt.y, opt.width, opt.height);
            ctx.beginPath();
            ctx.moveTo(opt.x, opt.y + opt.height);
            ctx.lineTo(opt.x + opt.width, opt.y);
            ctx.strokeStyle = "red";
            ctx.stroke();
            ctx.closePath();
        }
    };
}
