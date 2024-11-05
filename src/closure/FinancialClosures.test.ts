import { createBankAccount, createCounter } from './FinancialClosures';

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

describe('createBankAccount', () => {
  it('should create a bank account with initial balance', () => {
    const account = createBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  it('should create a bank account with default balance of 0', () => {
    const account = createBankAccount();
    expect(account.getBalance()).toBe(0);
  });

  it('should handle deposits correctly', () => {
    const account = createBankAccount(100);
    expect(account.deposit(50)).toBe(150);
    expect(account.getBalance()).toBe(150);
  });

  it('should handle withdrawals correctly', () => {
    const account = createBankAccount(100);
    expect(account.withdraw(30)).toBe(70);
    expect(account.getBalance()).toBe(70);
  });

  it('should handle deposite and withdrawals in sequence correctly', () => {
    const account = createBankAccount(100);
    expect(account.deposit(50)).toBe(150);
    expect(account.withdraw(30)).toBe(120);
    expect(account.getBalance()).toBe(120);
  });

  it('should throw error for negative deposits', () => {
    const account = createBankAccount(100);
    expect(() => account.deposit(-50)).toThrow('Deposit amount must be positive');
  });

  it('should throw error for negative withdrawals', () => {
    const account = createBankAccount(100);
    expect(() => account.withdraw(-50)).toThrow('Withdrawal amount must be positive');
  });

  it('should throw error for insufficient funds', () => {
    const account = createBankAccount(100);
    expect(() => account.withdraw(150)).toThrow('Insufficient funds');
  });
});