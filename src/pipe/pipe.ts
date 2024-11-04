import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';

const addTwo = (x: number): number => x + 2;
const multiplyByThree = (x: number): number => x * 3;

export function pipeNumberTest(n: number) {
  return pipe(n, addTwo, multiplyByThree);
}

// Using the composed function
const result = pipeNumberTest(5);
console.info(result); // Output: 21 (5 + 2 = 7, 7 * 3 = 21)

const getWordLength = (word: string): E.Either<Error, number> =>
  word.trim().length === 0
    ? E.left(new Error('Word length can not be 0'))
    : E.right(word.length);

const divide =
  (divisor: number) =>
    (dividend: number): E.Either<Error, number> =>
      divisor === 0
        ? E.left(new Error('Division by zero is not allowed'))
        : E.right(dividend / divisor);

export function pipeErrorHandlingTest(word: string, divisor: number) {
  return pipe(
    getWordLength(word),
    E.chain((wl: number) => {
      return pipe(
        wl,
        divide(divisor),
        E.map((n: number) => addTwo(n)),
      );
    }),
    E.fold(
      (error: Error) => `Error: ${error.message}`,
      (myResult: number) => `Result: ${myResult}`,
    ),
  );
}

pipeErrorHandlingTest('ABCD', 2); //(4/2) * 2 = 4
pipeErrorHandlingTest('ABCD', 0); //Error: Division by zero is not allowed
pipeErrorHandlingTest('', 2); //Error: Word length can not be 0
