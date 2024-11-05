import CounterModule from './CounterModule';

describe('CounterModule', () => {
  // Reset the counter before each test using the reset method
  beforeEach(() => {
    CounterModule.reset();
  });

  it('should initialize with count of 0', () => {
    expect(CounterModule.getCount()).toBe(0);
  });

  it('should increment the counter', () => {
    CounterModule.increment();
    expect(CounterModule.getCount()).toBe(1);
  });

  it('should decrement the counter', () => {
    CounterModule.decrement();
    expect(CounterModule.getCount()).toBe(-1);
  });

  it('should handle multiple operations correctly', () => {
    CounterModule.increment();
    CounterModule.increment();
    CounterModule.decrement();
    expect(CounterModule.getCount()).toBe(1);
  });

  it('should handle negative numbers', () => {
    CounterModule.decrement();
    CounterModule.decrement();
    expect(CounterModule.getCount()).toBe(-2);
  });

  // New test cases for reset functionality
  it('should reset counter to 0', () => {
    // Set up some initial state
    CounterModule.increment();
    CounterModule.increment();
    expect(CounterModule.getCount()).toBe(2);

    // Test reset
    CounterModule.reset();
    expect(CounterModule.getCount()).toBe(0);
  });

  it('should reset from negative numbers', () => {
    CounterModule.decrement();
    CounterModule.decrement();
    expect(CounterModule.getCount()).toBe(-2);

    CounterModule.reset();
    expect(CounterModule.getCount()).toBe(0);
  });

  // Test to verify console output
  it('should log count changes including reset', () => {
    const consoleSpy = jest.spyOn(console, 'info');

    CounterModule.increment();
    expect(consoleSpy).toHaveBeenCalledWith('Current Count: 1');

    CounterModule.reset();
    expect(consoleSpy).toHaveBeenCalledWith('Current Count: 0');

    consoleSpy.mockRestore();
  });
});
