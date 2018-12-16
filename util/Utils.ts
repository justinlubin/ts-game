function subset<T>(small: Set<T>, large: Set<T>): boolean {
  for (let elem of small) {
    if (!large.has(elem)) {
      return false;
    }
  }
  return true;
}
