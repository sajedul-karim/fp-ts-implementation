import { pipeNumberTest, pipeErrorHandlingTest } from './pipe';

describe('pipeNumberTest', () => {
  it('should correctly apply addTwo and multiplyByThree functions', () => {
    const inputNumber = 5;
    const expectedResult = 21;
    expect(pipeNumberTest(inputNumber)).toBe(expectedResult);
  });

  it('should return the same value when using 0 as input', () => {
    const inputNumber = 0;
    const expectedNumber = 6;
    expect(pipeNumberTest(inputNumber)).toBe(expectedNumber);
  });

  it('should handle negative numbers correctly', () => {
    const inputNumber = -3;
    const expectedResult = -3;
    expect(pipeNumberTest(inputNumber)).toBe(expectedResult);
  });
});

describe('pipeErrorHandlingTest', () => {
  it('should handle valid input and perform division with error handling', () => {
    const word = 'Test';
    const divisor = 2;
    const expectedResult = 'Result: 4';

    const result = pipeErrorHandlingTest(word, divisor);

    expect(result).toBe(expectedResult);
  });

  it('should handle word with length 0 error', () => {
    const word = ''; // Word with length 0
    const divisor = 2;
    const expectedError = 'Error: Word length can not be 0';

    const result = pipeErrorHandlingTest(word, divisor);

    expect(result).toBe(expectedError);
  });

  it('should handle division by zero error', () => {
    const word = 'Test';
    const divisor = 0; // Division by zero
    const expectedError = 'Error: Division by zero is not allowed';

    const result = pipeErrorHandlingTest(word, divisor);

    expect(result).toBe(expectedError);
  });
});
