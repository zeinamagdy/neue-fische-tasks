import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  //TO solve the Response DTOs and the leaky-entity problem
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    }),
  );
  //To run swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Cyber Chat API')
    .setDescription('Threads, user, and comments')
    .setVersion('1.0')
    .addTag('users', 'Operations related to user management') // Define tag metadata
    .addTag('auth', 'Authentication and authorization routes')
    .addTag('threads', 'Operations related to threads management')
    .addTag('comments', 'Operations related to comments management')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'token',
    )
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  // Write the OpenAPI spec to a json file
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2));
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
