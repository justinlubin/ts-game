class Render implements FixedSystem {
  readonly requirements =
    new Set<Component>([Component.BOUNDING_BOX, Component.APPEARANCE]);

  update(w: World): void {
    // Clear
    w.model.ctx.clearRect(0, 0, w.model.canvas.width, w.model.canvas.height);

    // Tilemap
    for (let y = 0; y < w.model.tilemap.tiles.length; y++) {
      for (let x = 0; x < w.model.tilemap.tiles[y].length; x++) {
        w.model.ctx.fillStyle = w.model.tilemap.color(new Vec(x, y));
        w.model.ctx.fillRect(
          x * w.model.tileSize * w.model.scale,
          y * w.model.tileSize * w.model.scale,
          w.model.tileSize * w.model.scale,
          w.model.tileSize * w.model.scale
        );
      }
    }

    // Entities
    w.forall(this.requirements, e => {
      const t = w.boundingBox[e];
      const a = w.appearance[e];

      w.model.ctx.fillStyle = a.color;
      w.model.ctx.fillRect(
        t.position.x * w.model.tileSize * w.model.scale,
        t.position.y * w.model.tileSize * w.model.scale,
        w.model.tileSize * w.model.scale,
        w.model.tileSize * w.model.scale
      );
    });
  }
}
