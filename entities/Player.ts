class Player {
  static create(world: World, pos: Vec) {
    let e: number = world.createEntityWith([
      Component.POSITION,
      Component.PHYSICS,
      Component.APPEARANCE,
      Component.USER_CONTROL
    ]);

    world.position[e] = pos;
    world.physics[e] = new Physics(Vec.zero(), Vec.zero(), false);
    world.appearance[e] = new Appearance("blue");

    return e;
  }
}
