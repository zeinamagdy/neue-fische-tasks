/*
Given a string, remove any characters that are unique from the string.
Example:
input: "abccdefee"
output: "cceee"
*/

import { test } from "@/test.ts";

function onlyDuplicates(s: string): string {
  // your code here
  if (s.length == 0) {
    return "";
  }
  const stringMap = new Map();
  let result = "";
  for (const char of s) {
    const currentCount = stringMap.get(char) ?? 0;
    stringMap.set(char, currentCount + 1);
  }

  for (const char of s) {
    if ((stringMap.get(char) ?? 0) > 1) {
      result += char;
    }
  }
  return result;
}
test(onlyDuplicates("abccdefee"), "cceee");
test(onlyDuplicates("abcde"), "");
test(onlyDuplicates("aabbcc"), "aabbcc");
test(onlyDuplicates("hello"), "ll");
test(onlyDuplicates(""), "");
