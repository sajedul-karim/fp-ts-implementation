import * as E from "fp-ts/Either";
import { getPlayerInfo } from "./seqArray";

describe("getPlayerInfo", () => {
  it("should return player info if age is above 18", async () => {
    const age = 25;
    const result = await getPlayerInfo(age)();
    expect(result).toEqual(E.right(`Name: John Doe, Age: ${age}`));
  });

  it("should return an error if age is under 18", async () => {
    const result = await getPlayerInfo(15)();
    expect(result).toEqual(E.left(new Error("Player is under aged. Age: 15")));
  });
});
