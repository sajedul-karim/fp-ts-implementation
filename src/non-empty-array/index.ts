import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import * as NEA from 'fp-ts/NonEmptyArray';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';

type ProcessedNumbers = {
  evenNumber: number[];
  oddNumber: number[];
};

export function getNumbers(
  allNumbers: number[],
): E.Either<Error, ProcessedNumbers> {
  const result = allNumbers.reduce(
    (acc, num) => {
      if (num % 2 === 0) {
        acc.evenNumber.push(num);
      } else {
        acc.oddNumber.push(num);
      }
      return acc;
    },
    { evenNumber: [], oddNumber: [] } as ProcessedNumbers,
  );
  return E.right(result);
}

export function processNumber(
  numbers: number[],
): TE.TaskEither<Error, NEA.NonEmptyArray<number>> {
  return TE.fromEither(
    pipe(
      getNumbers(numbers),
      E.chain((processedNumber: ProcessedNumbers) => {
        if (processedNumber.oddNumber.length > 0)
          console.info(`Odd Numbers: ${processedNumber.oddNumber}`);

        return pipe(
          NEA.fromArray(processedNumber.evenNumber),
          O.map((myNumbers: NEA.NonEmptyArray<number>) => {
            return NEA.sequence(E.Applicative)(
              pipe(
                myNumbers,
                NEA.map((mNumber) => E.right(mNumber * 2)),
              ),
            );
          }),
          O.getOrElse(() => E.left(new Error('No Number found'))),
        );
      }),
    ),
  );
}
