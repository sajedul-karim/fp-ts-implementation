import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/lib/function";
import { sequenceT } from "fp-ts/Apply";

function getName(): TE.TaskEither<Error, String> {
  return TE.right("John Doe");
}

function getAge(age: number): TE.TaskEither<Error, number> {
  return age > 18 ? TE.right(age) : TE.left(new Error("Player is under aged"));
}

export function getPlayerInfo(age: number): TE.TaskEither<Error, string> {
  return pipe(
    sequenceT(TE.ApplyPar)(getName(), getAge(age)),
    TE.chain(([name, age]) => {
      return TE.right(`Name: ${name}, Age: ${age}`);
    }),
    TE.mapLeft((e) => e)
  );
}
