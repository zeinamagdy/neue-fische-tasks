/*
https://www.codewars.com/kata/5340298112fa30e786000688
The objective is to return all pairs of integers from a given collection of integers that have a difference of 2.
The result should be sorted in ascending order.
The input will consist of unique values. The order of the integers in the input collection should not matter.
Examples
[1, 2, 3, 4]      -->  [[1, 3], [2, 4]]
[4, 1, 2, 3]      -->  [[1, 3], [2, 4]]
[1, 23, 3, 4, 7]  -->  [[1, 3]]
[4, 3, 1, 5, 6]   -->  [[1, 3], [3, 5], [4, 6]]
*/

import { test } from "@/test.ts";

function differenceOfTwo(arr: number[]): number[][] {
  // your code here
  //   const sortedArr = [...arr].sort((a, b) => a - b);
  //   let result: number[][] = [];
  //   for (let i:number = 0; i < sortedArr.length; i++) {
  //     for (let j:number = i + 1; j < sortedArr.length; j++) {
  //       if (Math.abs(sortedArr[i]! - sortedArr[j]!) === 2) {
  //         result.push([sortedArr[i]!, sortedArr[j]!]);
  //       }
  //     }
  //   }
  //   return result;
  const sortedArr = [...arr].sort((a, b) => a - b);
  const numberSet = new Set(sortedArr);
  const result: number[][] = [];
  for (const num of numberSet) {
    numberSet.has(num + 2) ?? result.push([num, num + 2]);
  }
  return result;
}

test(differenceOfTwo([1, 2, 3, 4]), [
  [1, 3],
  [2, 4],
]);
test(differenceOfTwo([4, 1, 2, 3]), [
  [1, 3],
  [2, 4],
]);
test(differenceOfTwo([1, 23, 3, 4, 7]), [[1, 3]]);
test(differenceOfTwo([4, 3, 1, 5, 6]), [
  [1, 3],
  [3, 5],
  [4, 6],
]);
test(differenceOfTwo([1, 5, 10]), []);
