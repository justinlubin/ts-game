class BoundingBox {
  constructor(
    public position: Vec,
    public width: number,
    public height: number
  ) {}

  right() {
    return this.position.x + this.width;
  }

  bottom() {
    return this.position.y + this.height;
  }
}
