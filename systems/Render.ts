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
      const t = w.transform[e];
      const a = w.appearance[e];

      w.model.ctx.fillStyle = a.color;
      w.model.ctx.fillRect(
        t.position.x * w.model.tileSize * w.model.scale,
        t.position.y * w.model.tileSize * w.model.scale,
        w.model.tileSize * w.model.scale,
        w.model.tileSize * w.model.scale
      );
    }
  }
}
