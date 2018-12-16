class Render implements FixedSystem {
  readonly requirements =
    new Set<Component>([Component.POSITION, Component.APPEARANCE]);

  update(w: World): void {
    w.model.ctx.clearRect(0, 0, w.model.canvas.width, w.model.canvas.height);
    for (
      let e = w.first(this.requirements);
      e != null;
      e = w.next(this.requirements, e)
    ) {
      w.model.ctx.fillStyle = w.appearance[e].color;
      w.model.ctx.fillRect(
        w.position[e].x * w.model.tileSize,
        w.position[e].y * w.model.tileSize,
        w.model.tileSize,
        w.model.tileSize
      );
    }
  }
}
