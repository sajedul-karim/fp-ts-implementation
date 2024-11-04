import { handleAge } from './monad-example/monad';

handleAge(1);
handleAge(2);

// Curried function to calculate the length of a string
function stringLength(str: string): (substring: string) => number {
  return function (substring: string): number {
    return str.concat(substring).length;
  };
}

// Usage of curried function
const getLength = stringLength('Hello, ');

console.info(getLength('World!')); // Output: 13
console.info(getLength('Universe!')); // Output: 19
