class Vec {
  constructor(readonly x: number, readonly y: number) {}

  static zero() : Vec {
    return new Vec(0, 0);
  }

  add(v : Vec) : Vec {
    return new Vec(this.x + v.x, this.y + v.y);
  }

  scale(a : number) : Vec {
    return new Vec(a * this.x, a * this.y);
  }
}
