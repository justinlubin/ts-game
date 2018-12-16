class Player {
  static create(world: World, position: Vec) {
    let e: number = world.createEntityWith([
      Component.POSITION,
      Component.PHYSICS,
      Component.APPEARANCE,
      Component.USER_CONTROL
    ]);

    world.transform[e] = new Transform(position);
    world.physics[e] = new Physics(Vec.zero(), Vec.zero(), false, 15, 30);
    world.appearance[e] = new Appearance("blue");

    return e;
  }
}
