import { z } from "zod";
import { ZodError, ZodSchema } from "zod";
import * as E from "fp-ts/Either";
import * as J from "fp-ts/Json";
import { pipe } from "fp-ts/lib/function";

export function decodeWith<T>(
  schema: ZodSchema,
  data: unknown
): E.Either<ZodError, T> {
  const result = schema.safeParse(data);
  if (result.success) {
    return E.right(result.data);
  }
  return E.left(result.error);
}

export function decodeJsonWith<T>(
  schema: ZodSchema,
  data: string
): E.Either<ZodError | Error, T> {
  return pipe(
    J.parse(data),
    E.mapLeft((e: unknown) =>
      e instanceof Error ? e : new Error(`Unknown error parsing: '${data}'`)
    ),
    E.chainW((jsonObj) => decodeWith(schema, jsonObj))
  );
}

export const UserSchema = z.object({
  name: z.string(),
  age: z.number().optional(),
  personalInfo: z.object({
    presentAddress: z.string(),
    permanentAddress: z.string().optional(),
  }),
});
export type UserSchemaType = z.infer<typeof UserSchema>;

export function parseUserObject(req: unknown): E.Either<Error, UserSchemaType> {
  const validatedRequestData: E.Either<Error, UserSchemaType> =
    decodeWith<UserSchemaType>(UserSchema, req);
  return validatedRequestData;
}

export function parseUserDataTest(userData: unknown) {
  return pipe(
    parseUserObject(userData),
    E.map((user: UserSchemaType) => {
      return {
        name: user.name,
        presentAddress: user.personalInfo.presentAddress,
      };
    })
  );
}

export function parseUserJson(req: string): E.Either<Error, UserSchemaType> {
  const validatedRequestData: E.Either<Error, UserSchemaType> =
    decodeJsonWith<UserSchemaType>(UserSchema, req);
  return validatedRequestData;
}
