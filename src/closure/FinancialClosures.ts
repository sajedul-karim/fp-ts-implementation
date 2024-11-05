type Counter = {
  getCount: () => number;
  increment: () => void;
};

export function createCounter(initialCount: number = 0): Counter {
  let count = initialCount;
  return {
    getCount: () => count,
    increment: () => count++,
  };
}

type BankAccount = {
  deposit: (amount: number) => number;
  withdraw: (amount: number) => number;
  getBalance: () => number;
};

export function createBankAccount(initialBalance: number = 0): BankAccount {
  // Private variable that can't be accessed directly from outside
  let balance = initialBalance;

  return {
    deposit: (amount: number) => {
      if (amount <= 0) throw new Error('Deposit amount must be positive');
      balance += amount;
      return balance;
    },

    withdraw: (amount: number) => {
      if (amount <= 0) throw new Error('Withdrawal amount must be positive');
      if (amount > balance) throw new Error('Insufficient funds');
      balance -= amount;
      return balance;
    },

    getBalance: () => balance,
  };
}