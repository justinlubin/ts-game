class Input implements FixedSystem {
  readonly requirements =
    new Set<Component>([Component.PHYSICS, Component.USER_CONTROL]);

  update(w: World, dt: number): void {
    w.forall(this.requirements, e => {
      let xVel = 0;
      if (w.model.keys.has(Key.RIGHT)) {
        xVel += w.physics[e].walkSpeed;
      }
      if (w.model.keys.has(Key.LEFT)) {
        xVel -= w.physics[e].walkSpeed;
      }
      w.physics[e].velocity = new Vec(xVel, w.physics[e].velocity.y);

      if (w.model.keys.has(Key.Z) && w.physics[e].grounded) {
        w.physics[e].velocity =
          w.physics[e].velocity.add(new Vec(0, -w.physics[e].jumpSpeed));
      }
    });
  }
}
