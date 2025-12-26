import { AABBColides } from "./utils/utils.js";
import { ResourceManager, Sounds } from "./resourceManager.js";

export class AudioManager {
  private static muted: boolean = true;
  private static position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  private static gameAudio = ResourceManager.sounds.music;
  static {
    AudioManager.gameAudio.loop = true;
    window.addEventListener("click", (e) => {
      if (
        AABBColides(AudioManager.position, {
          x: e.clientX,
          y: e.clientY,
          width: 1,
          height: 1,
        })
      ) {
        if (AudioManager.muted) {
          AudioManager.gameAudio.play();
        } else {
          AudioManager.gameAudio.pause();
        }
        AudioManager.muted = !AudioManager.muted;
      }
    });
  }
  static draw(ctx: CanvasRenderingContext2D) {
    const img = AudioManager.muted
      ? ResourceManager.graphics["audio-off"]
      : ResourceManager.graphics["audio-on"];

    ctx.drawImage(
      img,
      AudioManager.position.x,
      AudioManager.position.y,
      AudioManager.position.width,
      AudioManager.position.height
    );
  }
  static play(sound: Sounds) {
    if (AudioManager.muted) return;
    ResourceManager.sounds[sound].play();
  }

  static setPosition(position: typeof AudioManager.position) {
    AudioManager.position = position;
  }
}
