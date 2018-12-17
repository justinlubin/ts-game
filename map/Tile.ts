enum TileKind {
  AIR = 0,
  GROUND = 1
}

class Tilemap {
  constructor(public tiles: TileKind[][]) {}

  align(position: Vec): Vec | null {
    const x = Math.floor(position.x);
    const y = Math.floor(position.y);

    if (y < 0 || y >= this.tiles.length) {
      return null;
    }
    if (x < 0 || x >= this.tiles[y].length) {
      return null;
    }

    return new Vec(x, y);
  }

  blocked(position: Vec): boolean {
    return this.tiles[position.y][position.x] == TileKind.GROUND;
  }

  color(position: Vec): string {
    switch(this.tiles[position.y][position.x]) {
      case TileKind.AIR:
        return "skyblue";
      case TileKind.GROUND:
        return "brown";
    }
  }
}
