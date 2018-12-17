class Render implements FixedSystem {
  readonly requirements =
    new Set<Component>([Component.BOUNDING_BOX, Component.APPEARANCE]);

  readonly canvas: HTMLCanvasElement;
  readonly ctx : CanvasRenderingContext2D;

  private camera: BoundingBox;
  private followedEntity: number | null = null;

  constructor(
    public canvasId: string,
    viewportWidth: number,
    viewportHeight: number,
    public tileSize:  number,
    public scale: number
  ) {
    this.canvas = <HTMLCanvasElement> document.getElementById(canvasId);
    this.canvas.width = viewportWidth * tileSize * scale;
    this.canvas.height = viewportHeight * tileSize * scale;
    this.ctx = this.canvas.getContext("2d")!;
    this.camera = new BoundingBox(0, 0, viewportWidth, viewportHeight);
  }

  update(w: World): void {
    const xBound = w.model.tilemap.tiles[0].length;
    const yBound = w.model.tilemap.tiles.length;

    // Update camera

    if (this.followedEntity != null) {
      const clampLeft = 0;
      const clampTop = 0;
      const clampRight = xBound - this.camera.width;
      const clampBottom = yBound - this.camera.height;

      const bb = w.boundingBox[this.followedEntity];

      this.camera.x =
        Utils.clamp(
          bb.x + bb.width / 2 - this.camera.width / 2,
          clampLeft,
          clampRight
        );
      this.camera.y =
        Utils.clamp(
          bb.y + bb.height / 2 - this.camera.height / 2,
          clampTop,
          clampBottom
        );
    }

    // Clear
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Compute bounds

    const xMin = Math.floor(this.camera.x);
    const yMin = Math.floor(this.camera.y);
    const xMax = Math.min(xMin + this.camera.width, xBound - 1);
    const yMax = Math.min(yMin + this.camera.height, yBound - 1);
    const xOffset = this.camera.x - xMin;
    const yOffset = this.camera.y - yMin;

    // Tilemap
    for (let y = yMin; y <= yMax; y++) {
      for (let x = xMin; x <= xMax; x++) {
        this.ctx.fillStyle = w.model.tilemap.color(new Vec(x, y));
        this.ctx.fillRect(
          Math.round((x - xMin - xOffset) * this.tileSize * this.scale),
          Math.round((y - yMin - yOffset) * this.tileSize * this.scale),
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
        Math.round((bb.x - xMin - xOffset) * this.tileSize * this.scale),
        Math.round((bb.y - yMin - yOffset) * this.tileSize * this.scale),
        this.tileSize * this.scale,
        this.tileSize * this.scale
      );
    });
  }

  follow(e: number) {
    this.followedEntity = e;
  }
}
