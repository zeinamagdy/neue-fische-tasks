import { Controller, Get, Module, Injectable, Inject } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { QuotesModule } from "./moduels/qotes/quotes.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Injectable()
class AppService {
  generateMessage(): string {
    return "Hello World";
  }
}

@Controller()
class AppController {
  constructor(@Inject(AppService) private readonly appService: AppService) {}
  @Get("/")
  showHello() {
    return this.appService.generateMessage();
  }
}

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"), // Folder containing your HTML/CSS/JS
    }),
    QuotesModule,
  ],

  controllers: [],
  providers: [],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3232);
  console.log(`Server is running on port ${await app.getUrl()}`);
}

bootstrap();
