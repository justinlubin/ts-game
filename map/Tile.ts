enum TileKind {
  AIR = 0,
  GROUND = 1
}

class Tilemap {
  constructor(public tiles: TileKind[][]) {}

  blocked(x: number, y: number): boolean {
    return this.tiles[y][x] == TileKind.GROUND;
  }

  color(x: number, y: number): string {
    switch(this.tiles[y][x]) {
      case TileKind.AIR:
        return "skyblue";
      case TileKind.GROUND:
        return "brown";
    }
  }
}
