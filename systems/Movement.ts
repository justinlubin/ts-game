class Movement implements FixedSystem {
  readonly requirements =
    new Set<Component>([Component.POSITION, Component.PHYSICS]);

  update(w: World, dt: number): void {
    for (
      let e = w.first(this.requirements);
      e != null;
      e = w.next(this.requirements, e)
    ) {
      w.physics[e].velocity =
        w.physics[e].velocity.add(w.physics[e].acceleration.scale(dt));
      w.position[e] =
        w.position[e].add(w.physics[e].velocity.scale(dt));

      if(w.position[e].y + 1 >= w.model.viewHeight){
        w.physics[e].velocity = new Vec(w.physics[e].velocity.x, 0);
        w.position[e] = new Vec(w.position[e].x, w.model.viewHeight - 1);
        w.physics[e].grounded = true;
      } else {
        w.physics[e].grounded = false;
      }
    }
  }
}
