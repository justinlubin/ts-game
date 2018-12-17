class Player {
  static create(world: World, position: Vec) {
    let e: number = world.createEntityWith([
      Component.BOUNDING_BOX,
      Component.PHYSICS,
      Component.APPEARANCE,
      Component.USER_CONTROL
    ]);

    world.boundingBox[e] = new BoundingBox(position.x, position.y, 1, 1);
    world.physics[e] = new Physics(Vec.zero(), Vec.zero(), false, 15, 30);
    world.appearance[e] = new Appearance("blue");

    return e;
  }
}
