class Render implements FixedSystem {
  readonly requirements =
    new Set<Component>([Component.BOUNDING_BOX, Component.APPEARANCE]);

  readonly canvas: HTMLCanvasElement;
  readonly ctx : CanvasRenderingContext2D;

  constructor(
    public canvasId: string,
    public viewportWidth: number,
    public viewportHeight: number,
    public tileSize:  number,
    public scale: number
  ) {
    this.canvas = <HTMLCanvasElement> document.getElementById(canvasId);
    this.canvas.width = viewportWidth * tileSize * scale;
    this.canvas.height = viewportHeight * tileSize * scale;
    this.ctx = this.canvas.getContext("2d")!;
  }

  update(w: World): void {
    // Clear
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Tilemap
    for (let y = 0; y < w.model.tilemap.tiles.length; y++) {
      for (let x = 0; x < w.model.tilemap.tiles[y].length; x++) {
        this.ctx.fillStyle = w.model.tilemap.color(new Vec(x, y));
        this.ctx.fillRect(
          x * this.tileSize * this.scale,
          y * this.tileSize * this.scale,
          this.tileSize * this.scale,
          this.tileSize * this.scale
        );
      }
    }

    // Entities
    w.forall(this.requirements, e => {
      const bb = w.boundingBox[e];
      const a = w.appearance[e];

      this.ctx.fillStyle = a.color;
      this.ctx.fillRect(
        bb.x * this.tileSize * this.scale,
        bb.y * this.tileSize * this.scale,
        this.tileSize * this.scale,
        this.tileSize * this.scale
      );
    });
  }
}
