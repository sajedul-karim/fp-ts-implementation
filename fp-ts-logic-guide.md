# fp-ts Logic Guide

## Overview

**fp-ts** is a TypeScript library for functional programming that provides type-safe implementations of common functional programming patterns. It helps write more predictable, composable, and maintainable code by embracing functional programming principles.

## Core Concepts

### 1. **Option Type** - Safe Null Handling

The `Option` type is used to represent values that might not exist, eliminating null/undefined errors at compile time.

```typescript
import * as O from 'fp-ts/Option';

// Instead of returning null/undefined, return Option<T>
const findUserById = (id: number): O.Option<UserInfo> => {
  const user = userInfos.find((u) => u.id === id);
  return O.fromNullable(user); // Converts null/undefined to None, values to Some
};

// Safe handling of potentially missing values
const processUser = (userId: number) => {
  return pipe(
    findUserById(userId),
    O.fold(
      () => "User not found",           // None case
      (user) => `Found: ${user.name}`   // Some case
    )
  );
};
```

**Key Option Operations:**
- `O.some(value)` - Wrap a value in Some
- `O.none` - Represent absence of value
- `O.fromNullable(value)` - Convert null/undefined to None
- `O.fold()` - Handle both Some and None cases
- `O.map()` - Transform the value if it exists
- `O.getOrElse()` - Provide default value for None

### 2. **Either Type** - Error Handling

The `Either` type represents values that can be either success (Right) or failure (Left), providing structured error handling.

```typescript
import * as E from 'fp-ts/Either';

const divide = (dividend: number, divisor: number): E.Either<Error, number> => {
  return divisor === 0
    ? E.left(new Error('Division by zero'))
    : E.right(dividend / divisor);
};

// Chain operations that might fail
const processCalculation = (a: number, b: number) => {
  return pipe(
    divide(a, b),
    E.chain((result) => divide(result, 2)), // Chain another operation
    E.map((final) => final * 10),           // Transform success value
    E.fold(
      (error) => `Error: ${error.message}`,
      (result) => `Result: ${result}`
    )
  );
};
```

**Key Either Operations:**
- `E.left(error)` - Represent failure
- `E.right(value)` - Represent success
- `E.chain()` - Chain operations that might fail
- `E.map()` - Transform success values
- `E.fold()` - Handle both success and failure cases

### 3. **Pipe Function** - Function Composition

The `pipe` function enables readable left-to-right function composition, making complex data transformations easy to follow.

```typescript
import { pipe } from 'fp-ts/function';

const addTwo = (x: number): number => x + 2;
const multiplyByThree = (x: number): number => x * 3;

// Instead of: multiplyByThree(addTwo(5))
// Use pipe for better readability:
const result = pipe(
  5,
  addTwo,           // 5 + 2 = 7
  multiplyByThree   // 7 * 3 = 21
);
```

**Complex Example with Error Handling:**
```typescript
const processWord = (word: string, divisor: number) => {
  return pipe(
    word,
    getWordLength,                    // string -> Either<Error, number>
    E.chain(divide(divisor)),         // Chain division operation
    E.map(addTwo),                    // Transform success value
    E.fold(
      (error) => `Error: ${error.message}`,
      (result) => `Result: ${result}`
    )
  );
};
```

### 4. **TaskEither** - Async Operations

`TaskEither` combines `Task` (for async operations) and `Either` (for error handling), perfect for handling async operations that might fail.

```typescript
import * as TE from 'fp-ts/TaskEither';

// Async function that might fail
const fetchUserInfo = (userId: number): TE.TaskEither<Error, UserInfo> => {
  const user = userInfos.find((u) => u.id === userId);
  return user
    ? TE.right(user)
    : TE.left(new Error(`User not found: ${userId}`));
};

// Chain async operations
const processUser = (userId: number): TE.TaskEither<Error, UserResponse> => {
  return pipe(
    fetchUserInfo(userId),
    TE.chain((user) => {
      return pipe(
        fetchUserDetails(user.id),
        TE.map((details) => ({
          userId: user.id,
          country: details.country
        }))
      );
    })
  );
};
```

**Key TaskEither Operations:**
- `TE.right(value)` - Success case
- `TE.left(error)` - Failure case
- `TE.chain()` - Chain async operations
- `TE.map()` - Transform success values
- `TE.fold()` - Handle both success and failure

### 5. **Monadic Operations**

Monads provide a way to wrap values and chain operations while handling context (like potential absence or errors).

```typescript
// Option monad example
const handleAge = (userId: number) => {
  return pipe(
    fetchUserAge(userId),    // Returns Option<number>
    O.fold(
      () => console.error(`User ${userId} age not found`),
      (age) => console.info(`User ${userId} age is ${age}`)
    )
  );
};
```

**Monad Laws:**
1. **Left Identity**: `M.of(a).chain(f) === f(a)`
2. **Right Identity**: `m.chain(M.of) === m`
3. **Associativity**: `m.chain(f).chain(g) === m.chain(x => f(x).chain(g))`

### 6. **Practical Patterns**

#### **Nested Option/Either Handling**
```typescript
const getUserResponse = (userId: number): E.Either<Error, UserResponse> => {
  return pipe(
    findUserById(userId),
    O.fold(
      () => E.left(new Error(`User not found: ${userId}`)),
      (user) => pipe(
        findUserDetailsById(user.id),
        O.fold(
          () => E.left(new Error(`Details not found: ${user.id}`)),
          (details) => E.right({
            id: user.id,
            name: user.name,
            gender: details.gender
          })
        )
      )
    )
  );
};
```

#### **Safe Default Values**
```typescript
const getInterestRate = (value: number | null | undefined): number => {
  return pipe(
    value,
    O.fromNullable,
    O.getOrElse(() => 0)  // Default to 0 if null/undefined
  );
};
```

## Key Benefits

1. **Type Safety**: Eliminates null/undefined errors at compile time
2. **Composability**: Functions can be easily composed and chained
3. **Predictability**: Operations are pure and side-effect free
4. **Error Handling**: Structured approach to handling failures
5. **Readability**: Code flows naturally from left to right with pipe

## Common Use Cases

- **API Responses**: Handle success/failure scenarios
- **Data Validation**: Chain validation steps
- **Database Operations**: Handle queries that might fail
- **Configuration**: Handle optional configuration values
- **Async Operations**: Chain async operations with error handling

## Best Practices

1. **Use Option for nullable values** instead of null/undefined
2. **Use Either for operations that might fail** instead of throwing exceptions
3. **Use TaskEither for async operations** that might fail
4. **Compose functions with pipe** for better readability
5. **Handle all cases explicitly** using fold/match functions
6. **Keep functions pure** and avoid side effects

This functional programming approach with fp-ts leads to more robust, maintainable, and predictable TypeScript code.