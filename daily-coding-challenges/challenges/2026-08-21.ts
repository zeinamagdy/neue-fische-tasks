// You have an array of numbers.
// Your task is to sort ascending odd numbers but even numbers must be on their places.
// Zero isn't an odd number and you don't need to move it. If you have an empty array, you need to return it.
// Example
// sortArray([5, 3, 2, 8, 1, 4]) == [1, 3, 2, 8, 5, 4]

import { test } from "@/test.ts";

function sortArray(array: number[]): number[] {
  // your code here
  if (array.length == 0) return array;
  const isAlleven: boolean = array.every((num) => num % 2 == 0);
  if (isAlleven) return array;
  const isAllOdd: boolean = array.every((num) => num % 2 !== 0);
  if (isAllOdd) return array.sort((a, b) => a - b);

  const resultMap = new Map<number, number>(
    array.map((num, index) => [index, num]),
  );
  const oddNumbers: number[] = array
    .filter((num) => num % 2 !== 0)
    .sort((a, b) => a - b);
  for (const [key, value] of resultMap) {
    if (value % 2 !== 0) {
      const nextOdd = oddNumbers.shift();
      if (nextOdd !== undefined) {
        resultMap.set(key, nextOdd);
      }
    }
  }
  return [...resultMap.values()];
}
test(sortArray([5, 3, 2, 8, 1, 4]), [1, 3, 2, 8, 5, 4]);
test(sortArray([5, 3, 1, 8, 0]), [1, 3, 5, 8, 0]);
test(sortArray([]), []);
test(sortArray([2, 4, 6]), [2, 4, 6]);
test(sortArray([1, 3, 5, 7]), [1, 3, 5, 7]);
