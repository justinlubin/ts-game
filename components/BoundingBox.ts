class BoundingBox {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  right() {
    return this.x + this.width;
  }

  bottom() {
    return this.y + this.height;
  }
}
