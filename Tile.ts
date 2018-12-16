enum TileKind {
  AIR = 0,
  GROUND = 1
}

class Tile implements Renderable {
  constructor(public kind: TileKind, public pos: Vec) {}

  color() : string {
    switch (this.kind) {
      case TileKind.AIR:
        return "skyblue";
      case TileKind.GROUND:
        return "brown";
    }
  }

  render(model: Model): void {
    model.ctx.fillStyle = this.color();
    model.ctx.fillRect(
      this.pos.x * model.tileSize,
      this.pos.y * model.tileSize,
      model.tileSize,
      model.tileSize
    );
  }
}
