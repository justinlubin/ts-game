class Gravity implements FixedSystem {
  readonly requirements =
    new Set<Component>([Component.PHYSICS]);

  update(w: World, dt: number): void {
    w.forall(this.requirements, e => {
      w.physics[e].acceleration = new Vec(0, w.model.gravity);
    });
  }
}
