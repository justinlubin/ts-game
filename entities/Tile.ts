class Tile {
  static create(world: World, position: Vec, kind: Tile.Kind) {
    let e: number = world.createEntityWith([
      Component.POSITION,
      Component.APPEARANCE
    ]);

    world.transform[e] = new Transform(position);
    world.appearance[e] = new Appearance(Tile.color(kind));

    return e;
  }

  static color(kind: Tile.Kind): string {
    switch(kind) {
      case Tile.Kind.AIR:
        return "skyblue";
      case Tile.Kind.GROUND:
        return "brown";
    }
  }
}

namespace Tile {
  export enum Kind {
    AIR = 0,
    GROUND = 1
  }
}
