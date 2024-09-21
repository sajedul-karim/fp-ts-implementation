import { ZodError, z } from "zod";
import {
  parseUserObject,
  UserSchemaType,
  parseUserJson,
  UserSchema,
  parseUserDataTest,
} from "./zod-implementation";
import * as E from "fp-ts/Either";
import { Fixture, Generator } from "zod-fixture";

describe("Zod feature Test", () => {
  describe("parseUserObject", () => {
    it("should parse valid user data correctly", () => {
      const validUserData = {
        name: "John Doe",
        age: 30,
        personalInfo: {
          presentAddress: "123 Main St",
        },
      };

      const result: E.Either<Error, UserSchemaType> =
        parseUserObject(validUserData);

      expect(E.isRight(result)).toBe(true);
      if (E.isRight(result)) {
        expect(result.right).toEqual(validUserData);
      }
    });

    it("should handle invalid user data", () => {
      const invalidUserData = {
        age: 30,
        personalInfo: {
          presentAddress: "123 Main St",
          gender: "Male",
        },
      };

      const expectedError: ZodError = new ZodError([
        {
          code: "invalid_type",
          expected: "string",
          received: "undefined",
          path: ["name"],
          message: "Required",
        },
      ]);

      const result: E.Either<Error, UserSchemaType> =
        parseUserObject(invalidUserData);
      expect(E.isLeft(result)).toBe(true);
      expect(result).toEqual(E.left(expectedError));
    });
  });

  describe("parseUserJson", () => {
    it("should parse valid json data correctly", () => {
      const validUserData = {
        name: "John Doe",
        age: 30,
        personalInfo: {
          presentAddress: "123 Main St",
        },
      };

      const result: E.Either<Error, UserSchemaType> = parseUserJson(
        JSON.stringify(validUserData)
      );

      expect(E.isRight(result)).toBe(true);
      expect(result).toEqual(E.right(validUserData));
    });

    it("should handle invalid json data", () => {
      const invalidJsonData = "invalid json";
      const expectedError: ZodError = new ZodError([
        {
          code: "invalid_type",
          expected: "object",
          received: "string",
          path: [],
          message: "Expected object, received string",
        },
      ]);

      const result: E.Either<Error, UserSchemaType> = parseUserJson(
        JSON.stringify(invalidJsonData)
      );

      expect(E.isLeft(result)).toBe(true);
      expect(result).toEqual(E.left(expectedError));
    });

    it("should throw error when schema type not matched", () => {
      const invalidJsonData = {
        age: 50,
        personalInfo: {
          presentAddress: "123 Main St",
        },
      };
      const expectedError: ZodError = new ZodError([
        {
          code: "invalid_type",
          expected: "string",
          received: "undefined",
          path: ["name"],
          message: "Required",
        },
      ]);

      const result: E.Either<Error, UserSchemaType> = parseUserJson(
        JSON.stringify(invalidJsonData)
      );

      expect(E.isLeft(result)).toBe(true);
      expect(result).toEqual(E.left(expectedError));
    });
  });

  describe("Generate data using zod-fixture", () => {
    const UserSchemaData = new Fixture()
      .extend([
        Generator({
          schema: z.ZodString,
          filter: ({ context }) => context.path.at(-1) === "name",
          output: () => "John Doe",
        }),
      ])
      .fromSchema(UserSchema);

    it("should parse valid json data correctly", () => {
      const validUserData = { ...UserSchemaData };

      const result: E.Either<Error, UserSchemaType> = parseUserJson(
        JSON.stringify(validUserData)
      );

      expect(E.isRight(result)).toBe(true);
      expect(result).toEqual(E.right(validUserData));
    });
  });

  describe("parseUserDataTest", () => {
    it("should parse and extract name and presentAddress from valid user data", () => {
      const validUserData = {
        name: "John Doe",
        age: 30,
        personalInfo: {
          presentAddress: "123 Main St",
          permanentAddress: "456 Oak Ave",
        },
      };

      const result = parseUserDataTest(validUserData);

      expect(E.isRight(result)).toBe(true);
      if (E.isRight(result)) {
        expect(result.right).toEqual({
          name: "John Doe",
          presentAddress: "123 Main St",
        });
      }
    });

    it("should handle invalid user data", () => {
      const invalidUserData = {
        age: 30,
        personalInfo: {
          permanentAddress: "456 Oak Ave",
        },
      };

      const result = parseUserDataTest(invalidUserData);

      expect(E.isLeft(result)).toBe(true);
      if (E.isLeft(result)) {
        expect(result.left).toBeInstanceOf(ZodError);
      }
    });
  });
});
