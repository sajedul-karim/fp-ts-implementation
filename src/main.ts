// import * as SeqArrayTest from "./sequence-array/seqArray";
// import * as ZodTest from "./zod/zod-implementation";

// Sequence Array test
// Success case test
// let playerAge = 20;
// console.log(SeqArrayTest.showPlayerInfo(playerAge));

// Error case test
// playerAge = 15;
// console.log(SeqArrayTest.showPlayerInfo(playerAge));

// Zod test

// const userData = {
//   name: "John Doe",
//   personalInfo: {
//     presentAddress: "Dhaka",
//     gender: "male",
//   },
// };
// console.log(ZodTest.parseUserDataTest(userData)); //{ _tag: 'Right', right: { name: 'John Doe', presentAddress: 'Dhaka' } }

import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/Either";

const getWordLength = (word: string): E.Either<Error, number> =>
  word.trim().length === 0
    ? E.left(new Error("Word length can not be 0"))
    : E.right(word.length);

const divide =
  (divisor: number) => (dividend: number): E.Either<Error, number> =>
    divisor === 0
      ? E.left(new Error("Division by zero is not allowed"))
      : E.right(dividend / divisor);

const addTwo = (n: number): number => n + 2;

function pipeErrorHandlingTest(word: string, divisor: number) {
  const result = pipe(
    word,
    getWordLength,
    E.chain((wl) => {
      return pipe(
        wl,
        divide(divisor),
        E.map((n) => addTwo(n)),
      );
    }),
    E.fold(
      (error: Error) => console.error("Error:", error.message),
      (result: number) => console.log("Result:", result),
    )
  );
}

pipeErrorHandlingTest("ABCD", 2); //(4/2) * 2 = 4
pipeErrorHandlingTest("ABCD", 0); //Error: Division by zero is not allowed
pipeErrorHandlingTest("", 2); //Error: Word length can not be 0


// Function accepting two arguments (Binary function)
const add = (a: number, b: number): number => a + b;

// Curried version of the function
const curriedAdd = (a: number) => (b: number): number => a + b;

// Usage of curried function
const addTwo1 = curriedAdd(2); // Partial application, returns a new function waiting for the second argument
console.log(addTwo1(3)); // Outputs: 5 (adds 2 + 3)
