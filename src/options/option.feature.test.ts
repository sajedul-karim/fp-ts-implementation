import { findUserById, processUserResponse } from "./option-feature";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";

describe("Option and either test", () => {
  describe("findUserById", () => {
    it("should find a user by ID", () => {
      const result = findUserById(1);
      expect(O.isSome(result)).toBe(true);
      if (O.isSome(result)) {
        const user = result.value;
        expect(user.id).toBe(1);
        expect(user.name).toBe("Joe Baiden");
      }
    });
    it("should return None when user ID is not found", () => {
      const result = findUserById(10);
      expect(O.isNone(result)).toBe(true);
    });
  });

  describe("processUserResponse", () => {
    it("Should find user using provided ID", () => {
      const result = processUserResponse(1);
      expect(result).toEqual(
        E.right({
          id: 1,
          name: "Joe Baiden",
          gender: "male",
        })
      );
    });
    it("Should not find user using provided ID", () => {
      const userId = 10;
      const result = processUserResponse(userId);
      expect(result).toEqual(
        E.left(new Error(`user Not found for id: ${userId}`))
      );
    });
    it("Should not find userDetails using provided ID", () => {
      const userId = 3;
      const result = processUserResponse(userId);
      expect(result).toEqual(
        E.left(new Error(`User details not found using id: ${userId}`))
      );
    });
  });
});
