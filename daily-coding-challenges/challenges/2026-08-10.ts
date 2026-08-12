/*
Create a function which takes a string as input and returns an array containing the characters in the string whose binary representation of their ASCII code has more zeroes than ones.

The returned array must not contain duplicate characters. Only the first occurrence of each character in the input should be included, keeping the order of appearance.

All input will be valid strings of length > 0. Leading zeroes in binary should not be counted.
Examples

'abcde' === ["1100001", "1100010", "1100011", "1100100", "1100101"]
               True       True       False      True       False

        --> ['a','b','d']

'DIGEST'--> ['D','I','E','T']
*/

import { test } from "@/test.ts";

function moreZeros(s: string): string[] {
  // your code here
  const chars = [...new Set(s)]
  const result = []
  for(const c of chars){
    const binary = c.charCodeAt(0).toString(2);
    const zeroCount: number = (binary.match(/0/g) || []).length;
    const oneCount: number = (binary.match(/1/g) || []).length;
    if (zeroCount > oneCount) result.push(c)

  }
  return result
}

test(moreZeros("abcde"), ["a", "b", "d"]);
test(moreZeros("DIGEST"), ["D", "I", "E", "T"]);
test(moreZeros(""), []);
test(moreZeros("aaa"), ["a"]);
test(moreZeros("hello"), ["h", "l"]);