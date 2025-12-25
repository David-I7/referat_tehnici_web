export default class KeyboardManager {
  private keysDown: Set<string> = new Set();
  private frameKeys: Set<string> = new Set();
  constructor() {
    window.addEventListener("keydown", (e) => {
      this.keysDown.add(e.code);
      if (!e.repeat) {
        this.frameKeys.add(e.code);
      }
    });
    window.addEventListener("keyup", (e) => {
      this.keysDown.delete(e.code);
    });
  }

  isDown(key: string) {
    return this.keysDown.has(key);
  }

  wasPressed(key: string) {
    return this.frameKeys.has(key);
  }

  update() {
    this.frameKeys.clear();
  }

  reset() {
    this.keysDown = new Set();
    this.frameKeys = new Set();
  }
}
