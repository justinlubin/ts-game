class Gravity implements FixedSystem {
  readonly requirements =
    new Set<Component>([Component.PHYSICS]);

  update(w: World, dt: number): void {
    for (
      let e = w.first(this.requirements);
      e != null;
      e = w.next(this.requirements, e)
    ) {
      w.physics[e].acceleration = new Vec(0, w.model.gravity);
    }
  }
}
