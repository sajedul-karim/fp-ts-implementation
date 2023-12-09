import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import { sequenceT } from "fp-ts/Apply";

function getName(): TE.TaskEither<Error, String> {
  return TE.right("John Doe");
}

function getAge(): TE.TaskEither<Error, number> {
  return TE.right(30);
}

export function seqArrayTest(): TE.TaskEither<Error, string> {
  return pipe(
    sequenceT(TE.ApplyPar)(getName(), getAge()),
    TE.chain(([name, age]) => {
      return TE.right(`Name: ${name}, Age: ${age}`);
    }),
    TE.mapLeft((e) => e)
  );
}

async function testFP() {
  const testArray = await seqArrayTest()();
  if (E.isRight(testArray)) {
    const successResult = testArray.right;
    console.log(`Success Result: ${JSON.stringify(successResult)}`);
  } else {
    const errorResult = testArray.left;
    console.log(`errorResult: ${JSON.stringify(errorResult.message)}`);
  }
}

console.log(testFP());
