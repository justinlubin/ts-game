class Loop {
  static loop(
    model : Model,
    update : (model : Model, dt : number) => void,
    render : (model : Model) => void
  ) : void {
    const fixedTimestep = 1 / 60;

    let previousTime : number | null = null;
    let unsimulatedTime : number = 0;

    function func(currentTimeMs : number) {
      const currentTime = currentTimeMs / 1000;
      const deltaTime = previousTime == null ? 0 : currentTime - previousTime;
      unsimulatedTime += deltaTime;
      previousTime = currentTime;

      while (unsimulatedTime >= fixedTimestep) {
        update(model, fixedTimestep);
        unsimulatedTime -= fixedTimestep;
      }

      render(model);

      window.requestAnimationFrame(func);
    }

    window.requestAnimationFrame(func);
  }
}
