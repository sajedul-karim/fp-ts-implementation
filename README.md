# Functional Programming with fp-ts

This project demonstrates the implementation of functional programming concepts using the [fp-ts](https://gcanti.github.io/fp-ts/) library in TypeScript.

## Resources

- [Concepts of Functional Programming](https://levelup.gitconnected.com/concepts-of-functional-programming-9785f198ae86?sk=1d68436b534b0a2f5ffde2820d3fdac3)
- [fp-ts Documentation](https://gcanti.github.io/fp-ts/)
- [fp-ts API Reference](https://gcanti.github.io/fp-ts/modules/)
- [fp-ts GitHub Repository](https://github.com/gcanti/fp-ts)

## Installation

To install the project dependencies, run:

```bash
yarn install
```

## Scripts

- **Run the main application:**

  ```bash
  yarn dev
  ```

- **Build the project:**

  ```bash
  yarn build
  ```

- **Start the application:**

  ```bash
  yarn start
  ```

- **Run tests:**

  ```bash
  yarn test
  ```

- **Run a specific test:**

  ```bash
  yarn test -t <testName>
  ```

- **Lint the code:**

  ```bash
  yarn lint
  ```

- **Format the code:**

  ```bash
  yarn format
  ```

## Project Structure

- `src/`: Contains the source TypeScript files implementing various functional programming concepts.
  - `async-operation/`: Demonstrates usage of `TaskEither` for handling asynchronous operations.
  - `options/`: Implements functions using `Option` and `Either` for error handling.
  - `pipe/`: Examples of function composition using `pipe`.
  - `reduce/`: Examples using array reduction.
  - `non-empty-array/`: Working with non-empty arrays in fp-ts.
  - `sequence-array/`: Demonstrates sequencing of `TaskEither`.
  - `monad-example/`: Examples showcasing monadic operations.
  - `currying/`: Implements curried functions and their tests.
  - `zod/`: Schema validation using `zod` in combination with fp-ts.
- `tests/`: Contains test files for the respective modules using Jest.
```