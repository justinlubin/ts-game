class Physics {
  constructor(
    public velocity: Vec,
    public acceleration: Vec,

    public grounded: boolean,

    public walkSpeed: number,
    public jumpSpeed: number
  ) {}
}
