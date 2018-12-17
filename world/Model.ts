class Model {
  readonly keys : Set<Key>

  constructor(
    readonly tilemap: Tilemap,
  ) {
    this.keys = new Set<number>();

    window.addEventListener("keydown",
      (event : KeyboardEvent) => this.keys.add(event.keyCode)
    );

    window.addEventListener("keyup",
      (event : KeyboardEvent) => this.keys.delete(event.keyCode)
    );
  }
}
