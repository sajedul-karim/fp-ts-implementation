import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";

type UserInfo = {
  id: number;
  name: string;
};

const userInfos: UserInfo[] = [
  { id: 1, name: "Joe Baiden" },
  { id: 2, name: "Seikh Hasina" },
  { id: 3, name: "John Doe" },
];

type UserDetails = {
  id: number;
  userId: number;
  gender: string;
  address: string;
};
const userDetailsList: UserDetails[] = [
  { id: 1, userId: 1, gender: "male", address: "USA" },
  { id: 2, userId: 2, gender: "female", address: "Bangladesh" },
];

export function findUserById(id: number): O.Option<UserInfo> {
  return pipe(
    userInfos.find((u) => u.id === id),
    O.fromNullable
  );
}

function findUserDetailsById(userId: number): O.Option<UserDetails> {
  return pipe(
    userDetailsList.find((ud) => ud.userId === userId),
    O.fromNullable
  );
}

type UserResponse = {
  id: number;
  name: string;
  gender: string;
};

export function processUserResponse(
  userId: number
): E.Either<Error, UserResponse> {
  return pipe(
    findUserById(userId),
    O.fold(
      () => E.left(new Error(`user Not found for id: ${userId}`)),
      (user) => {
        return pipe(
          findUserDetailsById(user.id),
          O.fold(
            () =>
              E.left(new Error(`User details not found using id: ${user.id}`)),
            (ud) =>
              E.right({
                id: user.id,
                name: user.name,
                gender: ud.gender,
              })
          )
        );
      }
    )
  );
}

export function getUser(id: number) {
  return pipe(
    processUserResponse(id),
    E.fold(
      (e) => `Error is: ${e.message}`,
      (userResp) => `Response: ${JSON.stringify(userResp)}`
    )
  );
}
