class Movement implements FixedSystem {
  readonly requirements =
    new Set<Component>([Component.BOUNDING_BOX, Component.PHYSICS]);

  constructor(public horizontal: boolean, public vertical: boolean) {}

  update(w: World, dt: number): void {
    w.forall(this.requirements, e => {
      const bb = w.boundingBox[e];
      const p = w.physics[e];

      if (this.horizontal) {
        p.velocity.x += p.acceleration.x * dt;
        bb.position.x += p.velocity.x * dt;
      }

      if (this.vertical) {
        p.velocity.y += p.acceleration.y * dt;
        bb.position.y += p.velocity.y * dt;
      }
    });
  }
}
