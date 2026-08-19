import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThreadsModule } from './threads/threads.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './threads/entities/thread.entity';
import { Comment } from './comments/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'data/sqlite.db',
      entities: [Thread,Comment],
      synchronize: false,
      logging: false,
      enableWAL: true,
      statementCacheSize: 100,
    }),
    ThreadsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
