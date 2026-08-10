export type Book = {
  id: number;
  title: strring;
  author_name: string;
  is_available: boolean;
  added_at: string;
};

export type BookResponse = {
  id: number;
  title: string;
  authorName: string;
  addedAt: string;
};
export type reservation_status = "reserved" | "returned" | "cancelled";

// Book Library Reservations
// Your local library wants to create a reservation system for book reservations. Members of the library should be able to reserve books,
//  mark them as returned, and cancel reservations through their online account. Create a BookReservation class in TypeScript that implements the following criteria:

// accept a member name and a book title in the constructor
// store the reservation status so it cannot be changed directly from outside the class. The status can only be “reserved”, “returned”, or “cancelled”.
// provide a markReturned method that rejects the action if the reservation is already returned or cancelled
// provide a cancel method that rejects the action if the book has already been returned
// provide a way to read the current status safely
