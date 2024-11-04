import { processUser } from './AsyncOperation';
import * as E from 'fp-ts/Either';

describe('TaskEither test', () => {
  describe('processUser', () => {
    it('should find a user by ID', async () => {
      const result = await processUser(1)();
      expect(E.isRight(result)).toBe(true);
      expect(result).toEqual(
        E.right({
          userId: 1,
          country: 'USA',
        }),
      );
    });
  });
  it('should not found user by ID', async () => {
    const userId = 10;
    const result = await processUser(userId)();
    expect(E.isLeft(result)).toBe(true);
    expect(result).toEqual(
      E.left(new Error(`User not found by provided id: ${userId}`)),
    );
  });
  it('should not found user details by ID', async () => {
    const userId = 3;
    const result = await processUser(userId)();
    expect(E.isLeft(result)).toBe(true);
    expect(result).toEqual(
      E.left(new Error(`User details not found by provided id: ${userId}`)),
    );
  });
});
