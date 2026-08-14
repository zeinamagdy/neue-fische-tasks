import { Controller, Get, Inject } from "@nestjs/common";
import {QuotesService} from "./quotes.service";

@Controller()
export class QuotesController {
  constructor(@Inject(QuotesService) private readonly quotesService: QuotesService) {}
  @Get("/quotes")
  getall() {
    return this.quotesService.getall()
  }
   @Get("/quotes/random")
  getrandom() {
    return this.quotesService.getrandom() 
  }
}