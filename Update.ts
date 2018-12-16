class Update {
  static update(model : Model, dt : number) : void {
    const p = model.player;

    p.acc = new Vec(0, model.gravity);

    let xVel = 0;
    if (model.keys.has(Key.RIGHT)) {
      xVel += 10;
    }
    if (model.keys.has(Key.LEFT)) {
      xVel -= 10;
    }
    p.vel = new Vec(xVel, p.vel.y);

    if (model.keys.has(Key.Z) && p.grounded) {
      p.vel = p.vel.add(new Vec(0, -20));
      p.grounded = false;
    }

    p.vel = p.vel.add(p.acc.scale(dt));
    p.pos = p.pos.add(p.vel.scale(dt));

    if(p.pos.y + 1 >= model.viewHeight){
      p.vel = new Vec(p.vel.x, 0);
      p.pos = new Vec(p.pos.x, model.viewHeight - 1);
      p.grounded = true;
    }
  }
}
