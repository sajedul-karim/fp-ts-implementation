export function createCounter(initialCount: number = 0) {
  let count = initialCount;
  return {
    getCount: () => count,
    increment: () => count++,
  };
}