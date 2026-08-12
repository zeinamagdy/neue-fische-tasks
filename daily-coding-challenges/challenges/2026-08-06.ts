// Given a string, return a new string that has transformed based on the input:

// Change case of every character, ie. lower case to upper case, upper case to lower case.
// Reverse the order of words from the input.

import { test } from "@/test.ts";

function stringTransformer(s: string): string {
  // your code here
  const isLowercase = /^[a-z]$/;
  let result = "";

  for (let i = 0; i < s.length; i++) {
    if (isLowercase.test(s[i]!)) result += s[i]!.toUpperCase();
    else result += s[i]?.toLowerCase();
  }
  return result.split(" ").reverse().join(" ")
}

test(stringTransformer("Example Input"), "iNPUT eXAMPLE");
test(stringTransformer("Hello World"), "wORLD hELLO");
test(stringTransformer(""), "");
test(stringTransformer("abc DEF"), "def ABC");
test(stringTransformer("one two three"), "THREE TWO ONE");
