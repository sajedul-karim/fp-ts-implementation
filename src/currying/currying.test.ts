import { curryingAddDevideTest } from "./currying";
import * as E from "fp-ts/Either";

describe("curryingAddDevideTest", () => {
  it("should correctly add, divide, and then add again the numbers", () => {
    const n1 = 10;
    const n2 = 5;
    const word = "abc";
    const divisor = 2;

    const expectedResult = (n1 + n2 + word.length) / divisor; //9
    const result = curryingAddDevideTest(n1, n2, word, divisor);
    expect(result).toEqual(E.right(expectedResult));
  });

  it("should correctly handle devide by zero error", () => {
    const n1 = 10;
    const n2 = 5;
    const word = "abc";
    const divisor = 0;

    const expectedResult = "Divisor cannot be 0";
    const result = curryingAddDevideTest(n1, n2, word, divisor);
    expect(result).toEqual(E.left(new Error(expectedResult)));
  });

  it("should correctly handle word length can not be 0", () => {
    const n1 = 10;
    const n2 = 5;
    const word = "";
    const divisor = 2;

    const expectedResult = "Word length can not be 0";
    const result = curryingAddDevideTest(n1, n2, word, divisor);
    expect(result).toEqual(E.left(new Error(expectedResult)));
  });
});
