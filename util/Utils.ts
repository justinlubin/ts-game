class Utils {
  static subset<T>(small: Set<T>, large: Set<T>): boolean {
    for (let elem of small) {
      if (!large.has(elem)) {
        return false;
      }
    }
    return true;
  }

  static clamp(x: number, a: number, b: number): number {
    if (x < a) {
      return a;
    } else if (x > b) {
      return b;
    } else {
      return x;
    }
  }
}
