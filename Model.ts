class Model {
  readonly keys : Set<Key>
  readonly ctx : CanvasRenderingContext2D;
  readonly player : Entity;

  constructor(
    readonly canvas: HTMLCanvasElement,
    readonly tileSize: number,
    readonly viewWidth: number,
    readonly viewHeight: number,
    readonly gravity: number
  ) {
    this.keys = new Set<number>();

    window.addEventListener("keydown",
      (event : KeyboardEvent) => this.keys.add(event.keyCode)
    );

    window.addEventListener("keyup",
      (event : KeyboardEvent) => this.keys.delete(event.keyCode)
    );

    this.ctx = canvas.getContext("2d")!;

    this.player = {
      pos: new Vec(1, 1),
      vel: Vec.zero(),
      acc: Vec.zero(),
      grounded: false
    }
  }
}
