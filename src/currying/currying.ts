import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/Either';

const add = (n1: number, n2: number): number => n1 + n2;
const getWordLength = (word: string): E.Either<Error, number> =>
  word.trim().length === 0
    ? E.left(new Error('Word length can not be 0'))
    : E.right(word.length);

// Have to call total => word -> divisor
// devideAndAddNumber(divisor)(word)(total) => Right to left execution.
const devideAndAddNumber =
  (divisor: number) =>
    (word: string) =>
      (total: number): E.Either<Error, number> =>
        pipe(
          divisor,
          E.fromPredicate(
            (d) => d !== 0,
            () => new Error('Divisor cannot be 0'),
          ),
          E.chain(() => {
            return pipe(
              word,
              getWordLength,
              E.map((wordLength) => {
                return (total + wordLength) / divisor;
              }),
            );
          }),
        );

export function curryingAddDevideTest(
  n1: number,
  n2: number,
  word: string,
  divisor: number,
): E.Either<Error, number> {
  return pipe(add(n1, n2), devideAndAddNumber(divisor)(word));
}
