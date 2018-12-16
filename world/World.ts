class World {
  entityBound: number;

  readonly mask: Array<Set<Component>>;

  readonly position: Pos[];
  readonly physics: Physics[];
  readonly appearance: Appearance[];

  readonly loop: Loop;

  constructor(
    readonly model: Model,
    readonly maxEntities: number,
    readonly fixedSystems: FixedSystem[],
    readonly dynamicSystems: DynamicSystem[]
  ) {
    this.mask = new Array<Set<Component>>(maxEntities);

    for(let i = 0; i < this.maxEntities; i++) {
      this.mask[i] = new Set<Component>();
    }

    this.position = new Array<Pos>(maxEntities);
    this.physics = new Array<Physics>(maxEntities);
    this.appearance = new Array<Appearance>(maxEntities);

    this.entityBound = 0;

    this.loop = new Loop(
      1 / 60,
      dt => this.fixedSystems.map(s => s.update(this, dt)),
      () => this.dynamicSystems.map(s => s.update(this))
    );
  }

  createEntityWith(cs: Array<Component>) {
    for (let e = 0; e < this.maxEntities; e++) {
      if (this.mask[e].size == 0) {
        cs.forEach(c => this.mask[e].add(c));
        this.entityBound = Math.max(this.entityBound, e + 1);
        return e;
      }
    }
    alert("Error: no more entities!");
    return -1;
  }

  createEntity() {
    this.createEntityWith([]);
  }

  destroyEntity(e: number) {
    this.mask[e].clear();
  }

  next(cs: Set<Component>, e: number): number | null {
    for (let eNext = e + 1; eNext < this.entityBound; eNext++) {
      if (subset(cs, this.mask[eNext])) {
        return eNext;
      }
    }
    return null;
  }

  first(cs: Set<Component>): number | null {
    return this.next(cs, -1);
  }
}
