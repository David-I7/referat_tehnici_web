type Sounds =
  | "paddle-hit"
  | "score"
  | "wall-hit"
  | "confirm"
  | "select"
  | "no-select"
  | "brick-hit-1"
  | "brick-hit-2"
  | "hurt"
  | "victory"
  | "recover"
  | "high-score"
  | "pause"
  | "music";
type Graphics = "background" | "main" | "arrows" | "hearts" | "particle";
type Frames = "arrows" | "paddles" | "balls" | "bricks" | "hearts";

export class ResourceManager {
  private static loadPromise: Promise<void>;
  static sounds: Record<Sounds, HTMLAudioElement> = {} as Record<
    Sounds,
    HTMLAudioElement
  >;
  static graphics: Record<Graphics, HTMLImageElement> = {} as Record<
    Graphics,
    HTMLImageElement
  >;
  static frames: Record<Frames, ImageBitmap[]> = {} as Record<
    Frames,
    ImageBitmap[]
  >;
  constructor() {}

  static async awaitLoad(): Promise<void> {
    await ResourceManager.loadPromise;
  }

  static async load() {
    this.loadPromise = new Promise(async (res, rej) => {
      const graphicsUrl: Record<Graphics, string> = {
        background: "../assets/graphics/background.png",
        main: "../assets/graphics/breakout.png",
        arrows: "../assets/graphics/arrows.png",
        hearts: "../assets/graphics/hearts.png",
        particle: "../assets/graphics/particle.png",
      };
      ResourceManager.graphics = {
        background: new Image(),
        main: new Image(),
        arrows: new Image(),
        hearts: new Image(),
        particle: new Image(),
      };

      const graphicsPromises: Promise<HTMLImageElement>[] = [];
      Object.entries(ResourceManager.graphics).map(([key, val]) => {
        graphicsPromises.push(
          ResourceManager.loadImage(val, graphicsUrl[key as Graphics])
        );
      });

      const soundUrls: Record<Sounds, string> = {
        "paddle-hit": "../assets/sounds/paddle-hit.wav",
        score: "../assets/sounds/score.wav",
        "wall-hit": "../assets/sounds/wall-hit.wav",
        confirm: "../assets/sounds/confirm.wav",
        select: "../assets/sounds/select.wav",
        "no-select": "../assets/sounds/no-select.wav",
        "brick-hit-1": "../assets/sounds/brick-hit-1.wav",
        "brick-hit-2": "../assets/sounds/brick-hit-2.wav",
        hurt: "../assets/sounds/hurt.wav",
        victory: "../assets/sounds/victory.wav",
        recover: "../assets/sounds/recover.wav",
        "high-score": "../assets/sounds/high-score.wav",
        pause: "../assets/sounds/pause.wav",
        music: "../assets/sounds/music.wav",
      };
      ResourceManager.sounds = {
        "paddle-hit": new Audio(),
        score: new Audio(),
        "wall-hit": new Audio(),
        confirm: new Audio(),
        select: new Audio(),
        "no-select": new Audio(),
        "brick-hit-1": new Audio(),
        "brick-hit-2": new Audio(),
        hurt: new Audio(),
        victory: new Audio(),
        recover: new Audio(),
        "high-score": new Audio(),
        pause: new Audio(),
        music: new Audio(),
      };

      const soundPromises: Promise<HTMLAudioElement>[] = [];
      Object.entries(ResourceManager.sounds).forEach(([key, val]) => {
        soundPromises.push(
          ResourceManager.loadMedia(val, soundUrls[key as Sounds])
        );
      });

      await Promise.allSettled(graphicsPromises);

      const frames = [
        ResourceManager.generateQuads(
          ResourceManager.graphics["arrows"],
          24,
          24
        ),
        ResourceManager.generateQuadsPaddles(ResourceManager.graphics["main"]),
        ResourceManager.generateQuadsBalls(ResourceManager.graphics["main"]),
        ResourceManager.generateQuadsBricks(ResourceManager.graphics["main"]),
        ResourceManager.generateQuads(
          ResourceManager.graphics["hearts"],
          10,
          9
        ),
      ];

      ResourceManager.frames = {
        arrows: await frames[0],
        paddles: await frames[1],
        balls: await frames[2],
        bricks: await frames[3],
        hearts: await frames[4],
      };

      await Promise.allSettled(soundPromises);
      res();
    });
  }

  private static loadMedia<T extends HTMLMediaElement>(
    el: T,
    src: string
  ): Promise<T> {
    return new Promise((res, rej) => {
      el.src = src;

      el.addEventListener("loadeddata", () => res(el), { once: true });
      el.addEventListener("error", () => rej(el.error), { once: true });
    });
  }
  private static loadImage<T extends HTMLImageElement>(
    el: T,
    src: string
  ): Promise<T> {
    return new Promise((res, rej) => {
      el.src = src;
      el.addEventListener("load", () => res(el), { once: true });
    });
  }

  private static async generateQuads(
    image: HTMLImageElement,
    width: number,
    height: number
  ): Promise<ImageBitmap[]> {
    const ROWS = Math.ceil(image.height / height);
    const COLS = Math.ceil(image.width / width);

    const spriteSheet: Promise<ImageBitmap>[] = [];

    for (let r = 0; r < ROWS; ++r) {
      for (let c = 0; c < COLS; ++c) {
        spriteSheet.push(
          createImageBitmap(image, c * width, r * height, width, height)
        );
      }
    }

    return await Promise.all(spriteSheet);
  }
  private static async generateQuadsPaddles(
    image: HTMLImageElement
  ): Promise<ImageBitmap[]> {
    let x = 0;
    let y = 64;
    const width = 32;
    const height = 16;

    const spriteSheet: Promise<ImageBitmap>[] = [];

    for (let i = 0; i < 4; ++i) {
      spriteSheet.push(createImageBitmap(image, x, y, width, height));
      spriteSheet.push(
        createImageBitmap(image, x + width, y, width * 2, height)
      );
      spriteSheet.push(
        createImageBitmap(image, x + width + width * 2, y, width * 3, height)
      );
      spriteSheet.push(
        createImageBitmap(image, x, y + height, width * 4, height)
      );

      x = 0;
      y = y + height * 2;
    }

    return await Promise.all(spriteSheet);
  }
  private static async generateQuadsBalls(image: HTMLImageElement) {
    let x = 96;
    let y = 48;
    const width = 8;
    const height = 8;

    const spriteSheet: Promise<ImageBitmap>[] = [];

    for (let i = 0; i < 4; ++i) {
      spriteSheet.push(createImageBitmap(image, x, y, width, height));
      x += width;
    }

    x = 96;
    y += height;
    for (let i = 0; i < 3; ++i) {
      spriteSheet.push(createImageBitmap(image, x, y, width, height));
      x += width;
    }

    return await Promise.all(spriteSheet);
  }
  private static async generateQuadsBricks(image: HTMLImageElement) {
    const res = await ResourceManager.generateQuads(image, 32, 16);

    return res.slice(0, 21);
  }
}

ResourceManager.load();
