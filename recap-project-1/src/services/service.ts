import type { Book, Favorited_book } from "../types/types";

const base_url = "http://localhost:4730";

// to get favorited books list from local storage
const FAVORITES_KEY = "favorite_isbns";
export function getFavoritedBooks(): string[] {
  const saved = localStorage.getItem(FAVORITES_KEY);
  return saved ? JSON.parse(saved) : [];
}

export async function fetchBooks(): Promise<Favorited_book[]> {
  const response = await fetch(base_url + "/books");
  const data = await response.json();
  const favoritedBooks = new Set(getFavoritedBooks());
  // const books: Favorited_book[] = data.map((book: Book) => ({
  //   ...book,
  //   isFavorite: false,
  // }));
  const books: Favorited_book[] = data.map((book: Book) => ({
    ...book,
    isFavorite: favoritedBooks.has(book.isbn),
  }));

  console.log("book", books[0]); // it deosnt work in console
  return books as Favorited_book[];
}
//  export async function fetchbookswithpaging():Promise<Favorited_book[]>{
//    const response = await fetch(base_url + "/books?_page=2&_limit=10");
//   const data = await response.json();

//  }

export async function searcbyTitle(title: string): Promise<Favorited_book[]> {
  const response = await fetch(`${base_url}/books?q=${title}`);
  const data = await response.json();
  return data as Favorited_book[];
}

export async function fetcBookDitailes(isbn: string | null): Promise<Book> {
  const response = await fetch(`${base_url}/books/${isbn}`);
  const data = await response.json();
  return data as Book;
}
