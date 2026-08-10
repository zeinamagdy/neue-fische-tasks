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
export interface Notifiable {
  memberId: string;
  event: string;
  title: string;
  notify(memberId: string, event: string, title: string): void;
  // getChannelName(): string — returns the name of the channel (e.g. "email")
  getChannelName(): string;
}

abstract class BaseNotifier implements Notifiable {
  memberId: string;
  event: string;
  title: string;
  //should i need construcot. does it enough to have notify funcrion
  constructor(memberId: string, event: string, title: string) {
    this.memberId = memberId;
    this.event = event;
    this.title = title;
  }
  abstract notify(memberId: string, event: string, title: string): void;
  abstract send(memberId: string, message: string): void;

  abstract getChannelName(): string;

  formatMessage(event: "reservation" | "overdue", title: string): string {
    return `Your reservation for ${title} is ${event}.`;
  }
}

class EmailNotifier extends BaseNotifier {
  getChannelName(): string {
    return "email";
  }
  send(memberId: string, message: string): void {
    console.log(`Sending: ${message} from ${memberId}`);
  }
  notify(
    memberId: string,
    event: "reservation" | "overdue",
    title: string,
  ): void {
    this.send(memberId, this.formatMessage(event, title));
  }
}
class SmsNotifier extends BaseNotifier {
  getChannelName(): string {
    return "SMS";
  }
  send(memberId: string, message: string): void {
    console.log(`Sending: #${memberId} :${message} from `);
  }
  notify(
    memberId: string,
    event: "reservation" | "overdue",
    title: string,
  ): void {
    this.send(memberId, this.formatMessage(event, title));
  }
}

export class NotificationService {
  private channels: Notifiable[];
  constructor(channels: Notifiable[]) {
    this.channels = channels;
  }
  dispatch(
    memberId: string,
    event: "reservation" | "overdue",
    title: string,
  ): void {
    for (const channel of this.channels) {
      channel.notify(memberId, event, title);
    }
  }
}

// Accepts an array of Notifiable channels in its constructor (think of these as the notification channels that the user already has enabled)
// Has a dispatch(memberId: string, event: "reservation" | "overdue", title: string): void method that calls notify on every channel
// Test your solution by creating a NotificationService with both an EmailNotifier and SmsNotifier, then dispatching a "reservation" event for "Dune" to member "42".
