import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/lib/function";

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
  country: string;
};

const userDetailsList: UserDetails[] = [
  { id: 1, userId: 1, country: "USA" },
  { id: 2, userId: 2, country: "BD" },
];

export function fetchUserInfo(userId: number): TE.TaskEither<Error, UserInfo> {
  const user = userInfos.find((u) => u.id === userId);
  return user
    ? TE.right(user)
    : TE.left(new Error(`User not found by provided id: ${userId}`));
}

export function fetchUserDetails(
  userId: number
): TE.TaskEither<Error, UserDetails> {
  const userDetails = userDetailsList.find((ud) => ud.userId === userId);
  return userDetails
    ? TE.right(userDetails)
    : TE.left(new Error(`User details not found by provided id: ${userId}`));
}

type UserResponse = {
  userId: number;
  country: string;
};

export function processUser(
  userId: number
): TE.TaskEither<Error, UserResponse> {
  return pipe(
    fetchUserInfo(userId),
    TE.chain((user) => {
      return pipe(
        fetchUserDetails(user.id),
        TE.map((userDetails) => {
          return {
            userId: user.id,
            country: userDetails.country,
          };
        })
      );
    })
  );
}
