import { createCounter } from './counterClosure';

describe('createCounter', () => {
  it('should initialize the counter with the given initial count', () => {
    const initialCount = 5;
    const counter = createCounter(initialCount);
    expect(counter.getCount()).toBe(initialCount);
  });

  it('should increment the counter', () => {
    const counter = createCounter(0);
    counter.increment();
    expect(counter.getCount()).toBe(1);
  });

  it('should maintain state between increments', () => {
    const counter = createCounter(10);
    counter.increment();
    counter.increment();
    expect(counter.getCount()).toBe(12);
  });

  it('should default to 0 if no initial count is provided', () => {
    const counter = createCounter();
    expect(counter.getCount()).toBe(0);
  });
}); 