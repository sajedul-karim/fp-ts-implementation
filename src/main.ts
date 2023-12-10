import * as SeqArrayTest from "./sequence-array/seqArray";
import * as ZodTest from "./zod/zod-implementation";

// Sequence Array test
// Success case test
// let playerAge = 20;
// console.log(SeqArrayTest.showPlayerInfo(playerAge));

// Error case test
// playerAge = 15;
// console.log(SeqArrayTest.showPlayerInfo(playerAge));

// Zod test

const userData = {
  name: "John Doe",
  personalInfo: {
    presentAddress: "Dhaka",
    gender: "male",
  },
};
console.log(ZodTest.parseUserDataTest(userData)); //{ _tag: 'Right', right: { name: 'John Doe', presentAddress: 'Dhaka' } }
