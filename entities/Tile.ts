class Tile {
  static create(world: World, pos: Vec, kind: Tile.Kind) {
    let e: number = world.createEntityWith([
      Component.POSITION,
      Component.APPEARANCE
    ]);

    world.position[e] = pos;
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
