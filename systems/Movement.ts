class Movement implements FixedSystem {
  readonly requirements =
    new Set<Component>([Component.POSITION, Component.PHYSICS]);

  update(w: World, dt: number): void {
    for (
      let e = w.first(this.requirements);
      e != null;
      e = w.next(this.requirements, e)
    ) {
      const t = w.transform[e];
      const p = w.physics[e];

      p.velocity = p.velocity.add(p.acceleration.scale(dt));
      t.position = t.position.add(p.velocity.scale(dt));

      if(t.position.y + 1 >= w.model.viewHeight){
        p.velocity = new Vec(p.velocity.x, 0);
        t.position = new Vec(t.position.x, w.model.viewHeight - 1);
        p.grounded = true;
      } else {
        p.grounded = false;
      }
    }
  }
}
