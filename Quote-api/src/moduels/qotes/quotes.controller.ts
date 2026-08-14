import { Controller, Get, Inject, Query } from "@nestjs/common";
import { QuotesService } from "./quotes.service";

@Controller("quotes")
export class QuotesController {
  constructor(
    @Inject(QuotesService) private readonly quotesService: QuotesService,
  ) {}
  @Get()
  getQuotes(@Query("author")author?: string) {
    if (author) {
      return this.quotesService.getByAuthor(author);
    }
    return this.quotesService.getall();
  }

  @Get("random")
  getrandom() {
    return this.quotesService.getrandom();
  }
}
