class Pointer {
  pageY: number = 0;
  pageX: number = 0;
  id: number = 0;
  width: number = 0;
  height: number = 0;
  clientX: number = 0;
  clientY: number = 0;

  constructor(e: PointerEvent) {
    this.update(e);
  }

  update(e: PointerEvent) {
    this.clientX = e.clientX;
    this.clientY = e.clientY;
    this.pageX = e.pageX;
    this.pageY = e.pageY;
    this.id = e.pointerId;
    this.width = e.width;
    this.height = e.height;
  }
}

class PointerManager {
  private touchesDown: Record<number, Pointer> = {};
  private frameTouches: Pointer[] = [];
  private mousesDown: Record<number, Pointer> = {};
  private frameMouses: Pointer[] = [];
  constructor() {
    window.addEventListener("pointerdown", (e) => {
      const pointer = new Pointer(e);
      if (e.type == "mouse") {
        this.mousesDown[e.pointerId] = pointer;
        this.frameMouses.push(pointer);
      } else if (e.type == "touch") {
        this.touchesDown[e.pointerId] = pointer;
        this.frameTouches.push(pointer);
      }
    });
    window.addEventListener("pointermove", (e) => {
      if (e.type == "mouse") {
        this.mousesDown[e.pointerId].update(e);
      } else if (e.type == "touch") {
        this.touchesDown[e.pointerId].update(e);
      }
    });
    window.addEventListener("pointerup", (e) => {
      console.log(e);
    });
  }

  getTouchesDown() {
    return this.touchesDown;
  }
  getTouchesPressed() {
    return this.frameTouches;
  }
  getMousesDown() {
    return this.mousesDown;
  }
  getMousesPressed() {
    return this.frameMouses;
  }

  update() {
    this.frameMouses = [];
    this.frameTouches = [];
  }

  reset() {}
}
