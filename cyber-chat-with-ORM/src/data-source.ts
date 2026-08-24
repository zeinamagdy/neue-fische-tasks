import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Comment } from './comments/entities/comment.entity';
import { Thread } from './threads/entities/thread.entity';
import { User } from './user/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'data/sqlite.db',
  entities: [Comment, Thread, User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Absolutely critical to disable this here
});
