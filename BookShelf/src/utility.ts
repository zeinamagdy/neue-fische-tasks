/*Write three generic utility functions that work with any object type. Test each one using an array of Book objects.

groupBy<T, K extends keyof T>(items: T[], key: K): Record<string, T[]> takes an array and a property name, then returns an object 
where each key is a distinct value of that property and each value is an array of matching items. 
Example: grouping books by author.

pluck<T, K extends keyof T>(items: T[], key: K): T[K][] takes an array and a property name, then returns an array containing 
just that property’s value from each item. Example: extracting all book titles.

merge<T>(base: T, updates: Partial<T>): T takes a base object and a partial update, then returns a new object with the updates applied. Example: applying a BookUpdatePayload to a Book.

Each function must be generic, fully annotated, and work with any object type, not just Book.
*/

import type { Book } from "../types/book";
const books: Book[] = [
  {
    id: "2",
    title: "Clean Code",
    author: "Robert C. Martin",
    isAvailable: true,
    isbn: "76312766734",
    createdAt: "gsgsgs",
    updatedAt: "gsggs",
  },

  {
    id: 3,
    title: "Refactoring",
    author: "Martin Fowler",
    isAvailable: true,
    isbn: "76312766734",
    createdAt: "gsgsgs",
    updatedAt: "gsggs",
  },
  {
    id: 4,
    title: "Refactoring34",
    author: "Martin Fowler",
    isAvailable: true,
    isbn: "76312766734",
    createdAt: "gsgsgs",
    updatedAt: "gsggs",
  },
];
function groupBy<T, K extends keyof T>(
  items: T[],
  key: K,
): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  for (const item of items) {
    const groupKey = String(item[key]);
    if (!result[groupKey]) result[groupKey] = [];
    result[groupKey].push(item);
  }
  return result;
}

console.log("test grouped", groupBy(books, "author"));
