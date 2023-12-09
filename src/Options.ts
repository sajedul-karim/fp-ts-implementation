import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/Option";

function getInterestRate(value: number | null | undefined): string {
  return pipe(
    value,
    O.fromNullable,
    O.map((v) => `Rate is: ${v}`),
    O.getOrElse(() => `Rate is default: 0`)
  );
}

const x = 10;
// const x = null;
// const x = undefined;

console.log(getInterestRate(x));
