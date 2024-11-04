import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';

type UserDatabase = {
  [key: number]: number | undefined;
};

const fetchUserAge = (userId: number): O.Option<number> => {
  const userDatabase: UserDatabase = {
    1: 30,
    2: undefined, // Age is undefined for this user
  };

  const userAge = userDatabase[userId];

  return typeof userAge !== 'undefined' ? O.some(userAge) : O.none; // Return Some(age) or None
};

export function handleAge(userId: number) {
  pipe(
    fetchUserAge(userId),
    O.fold(
      () => console.error(`User ${userId} age not found`),
      (age) => console.info(`User ${userId} age is ${age}`),
    ),
  );
}
