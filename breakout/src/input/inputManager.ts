import KeyboardManager from "./keyboardManager.js";

export class InputManager {
  keyboard: KeyboardManager = new KeyboardManager();
  private _mousePressed: {
    x: number;
    y: number;
    pressed: boolean;
  } = {
    x: 0,
    y: 0,
    pressed: false,
  };
  constructor() {
    window.addEventListener("mousedown", (e) => {
      this._mousePressed.pressed = true;
      this._mousePressed.x = e.clientX;
      this._mousePressed.y = e.clientY;
    });
    window.addEventListener("mouseup", (e) => {
      this._mousePressed.pressed = false;
    });
    window.addEventListener("mouseleave", (e) => {
      this._mousePressed.pressed = false;
    });
  }

  mousePressed(): typeof this._mousePressed | null {
    if (this._mousePressed.pressed) {
      return this._mousePressed;
    } else return null;
  }

  update(): void {
    this._mousePressed.pressed = false;
    this.keyboard.update();
  }

  reset(): void {
    this._mousePressed.pressed = false;
    this.keyboard.reset();
  }
}

export const gInputManager = new InputManager();
