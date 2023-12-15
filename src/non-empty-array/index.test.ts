import * as E from "fp-ts/Either";
import { processNumber } from "./index";

describe("NEAProcessNumber", () => {
  test("should increment numbers in the array and return a NonEmptyArray", async () => {
    const numbers = [1, 2, 3, 4, 5];
    const expectedNumbers = [4, 8];

    const result = await processNumber(numbers)();
    expect(result).toEqual(E.right(expectedNumbers));
  });

  test("should return an error for empty array", async () => {
    const emptyNumbers: number[] = [];

    const result = await processNumber(emptyNumbers)();
    expect(result).toEqual(E.left(new Error("No Number found")));
  });
});
