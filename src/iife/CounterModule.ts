// Define an interface for type safety
interface Counter {
  increment: () => void;
  decrement: () => void;
  getCount: () => number;
  reset: () => void;
}

// Create the Counter module using an IIFE
const CounterModule: Counter = (() => {
  // Private variable, not accessible outside the IIFE
  let count: number = 0;

  // Private helper function (optional)
  const logCount = (): void => {
    console.info(`Current Count: ${count}`);
  };

  // Public methods exposed by the module
  const increment = (): void => {
    count++;
    logCount();
  };

  const decrement = (): void => {
    count--;
    logCount();
  };

  const getCount = (): number => {
    return count;
  };

  const reset = (): void => {
    count = 0;
    logCount();
  };

  // Return an object exposing public methods
  return {
    increment,
    decrement,
    getCount,
    reset,
  };
})();

export default CounterModule;