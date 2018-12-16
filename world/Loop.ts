class Loop {
  private id: number = 0;

  constructor(
    readonly fixedTimestep: number,
    readonly fixedUpdate: (dt: number) => void,
    readonly dynamicUpdate: () => void
  ) {}

  start() {
    let previousTime : number | null = null;
    let unsimulatedTime : number = 0;

    const func = (currentTimeMs: number) => {
      const currentTime = currentTimeMs / 1000;
      const deltaTime = previousTime == null ? 0 : currentTime - previousTime;
      unsimulatedTime += deltaTime;
      previousTime = currentTime;

      while (unsimulatedTime >= this.fixedTimestep) {
        this.fixedUpdate(this.fixedTimestep);
        unsimulatedTime -= this.fixedTimestep;
      }

      this.dynamicUpdate();

      this.id = window.requestAnimationFrame(func);
    }

    this.id = window.requestAnimationFrame(func);
  }

  stop() {
    window.cancelAnimationFrame(this.id);
  }
}
