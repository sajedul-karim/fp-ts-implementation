import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import { sequenceT } from "fp-ts/Apply";

function getName(): TE.TaskEither<Error, String> {
  return TE.right("John Doe");
}

function getAge(age: number): TE.TaskEither<Error, number> {
  return age > 18
    ? TE.right(age)
    : TE.left(new Error(`Player is under aged. Age: ${age}`));
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

export async function showPlayerInfo(age: number) {
  const player = await getPlayerInfo(age)();
  if (E.isLeft(player)) {
    console.log(player.left.message);
  } else {
    console.log(player.right);
  }
}
