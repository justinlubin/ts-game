class Input implements FixedSystem {
  readonly requirements =
    new Set<Component>([Component.PHYSICS, Component.USER_CONTROL]);

  update(w: World, dt: number): void {
    for (
      let e = w.first(this.requirements);
      e != null;
      e = w.next(this.requirements, e)
    ) {
      let xVel = 0;
      if (w.model.keys.has(Key.RIGHT)) {
        xVel += 10;
      }
      if (w.model.keys.has(Key.LEFT)) {
        xVel -= 10;
      }
      w.physics[e].velocity = new Vec(xVel, w.physics[e].velocity.y);

      if (w.model.keys.has(Key.Z) && w.physics[e].grounded) {
        w.physics[e].velocity = w.physics[e].velocity.add(new Vec(0, -20));
      }
    }
  }
}
