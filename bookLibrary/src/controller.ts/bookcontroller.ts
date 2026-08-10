// Book Library Reservations
// Your local library wants to create a reservation system for book reservations. Members of the library should be able to reserve books,
// mark them as returned, and cancel reservations through their online account. Create a BookReservation class in TypeScript that implements the following criteria:

// accept a member name and a book title in the constructor
// store the reservation status so it cannot be changed directly from outside the class. The status can only be “reserved”, “returned”, or “cancelled”.
// provide a markReturned method that rejects the action if the reservation is already returned or cancelled
// provide a cancel method that rejects the action if the book has already been returned
// provide a way to read the current status safely

import type { Book, BookResponse, reservation_status } from "../data/data";

export const availableBooks = (books: Book[]): BookResponse[] => {
  return books
    .filter((book) => book.is_available)
    .map((book) => ({
      id: book.id,
      title: book.title,
      authorName: book.author_name,
      addedAt: book.added_at,
    })) as BookResponse[];
};

class BookReservation {
  member_name: string;
  book_title: string;
  #reservation_status: reservation_status;

  constructor(member_name: string, book_title: string) {
    this.member_name = member_name;
    this.book_title = book_title;
    this.#reservation_status = "cancelled";
  }
  // provide a way to read the current status safely
  getStatus(): reservation_status {
    return this.#reservation_status;
  }
  setStatus(status: reservation_status): void {
    this.#reservation_status = status;
  }
  // provide a markReturned method that rejects the action if the reservation is already returned or cancelled
  markReturned() {
    if (this.#reservation_status == "cancelled" || "returned") {
      throw new Error(
        `Cannot return a book with status: ${this.#reservation_status}`,
      );
    } else {
      this.#reservation_status = "returned";
    }
  }
  // provide a cancel method that rejects the action if the book has already been returned
  cancel() {
    if (this.#reservation_status == "returned") {
      throw new Error(
        `Cannot cancelled a book with status: ${this.#reservation_status}`,
      );
    }
  }
}
