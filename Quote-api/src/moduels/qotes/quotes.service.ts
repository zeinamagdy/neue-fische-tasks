import { Injectable } from "@nestjs/common";
import { quotesData } from "../../data/quotes";
import type { Quote } from "./quotes.t";

@Injectable()
export class QuotesService {
  getall(): Quote[] {
    return quotesData;
  }
  getrandom(): Quote {
    return quotesData[Math.floor(Math.random() * quotesData.length)];
  }
  getByAuthor(author: string): Quote[] {
    return quotesData.filter((item) => item.author == author);
  }
}
