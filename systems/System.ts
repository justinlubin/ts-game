interface System {
  readonly requirements: Set<Component>;
}

interface FixedSystem extends System {
  update(w: World, dt: number): void;
}

interface DynamicSystem extends System {
  update(w: World): void;
}
