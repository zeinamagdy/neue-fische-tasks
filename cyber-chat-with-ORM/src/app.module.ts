import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThreadsModule } from './threads/threads.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './threads/entities/thread.entity';
import { Comment } from './comments/entities/comment.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
//TO add configration to app and get env file safely and Asyn
import { ConfigModule } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available everywhere without re-importing
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'data/sqlite.db',
      entities: [Thread, Comment, User],
      synchronize: false,
      logging: false,
      enableWAL: true,
      autoLoadEntities: true,
      statementCacheSize: 100,
    }),
    ThreadsModule,
    CommentsModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers:[AppService]
  // providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],// App_GUARD  to protect all the routes
})
export class AppModule {}
