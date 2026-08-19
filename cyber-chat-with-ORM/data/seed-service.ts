import { Injectable, Logger } from '@nestjs/common';
import Database from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';

interface SeedComment {
  author: string;
  body: string;
}

interface SeedThread {
  author?: string;
  title: string;
  body: string;
  comments?: SeedComment[];
}

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  // Helper method to read and parse external JSON files
  private loadJsonData<T>(relativePath: string): T {
    // process.cwd() gets the root directory where the command is executed
    const absolutePath = path.resolve(process.cwd(), relativePath);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Seed file not found at: ${absolutePath}`);
    }

    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(fileContent) as T;
  }

  async seed(): Promise<void> {
    // 1. Read seed data dynamically from root-level /data folder
    const threadsData = this.loadJsonData<SeedThread[]>('data/mock-threads.json');

    const db = new Database('sqlite.db');
    db.pragma('foreign_keys = ON');

    const insertThread = db.prepare(`
      INSERT INTO thread (id, author, title, body, createdAt)
      VALUES (@id, @author, @title, @body, @createdAt)
    `);

    const insertComment = db.prepare(`
      INSERT INTO comment (id, threadId, author, body, createdAt)
      VALUES (@id, @threadId, @author, @body, @createdAt)
    `);

    // 2. Wrap reads and inserts inside a single synchronous transaction
    const seedTransaction = db.transaction((threads: SeedThread[]) => {
      db.prepare('DELETE FROM comment').run();
      db.prepare('DELETE FROM thread').run();

      const now = new Date().toISOString();

      for (const item of threads) {
        const threadId = crypto.randomUUID();

        insertThread.run({
          id: threadId,
          author: item.author ?? null,
          title: item.title,
          body: item.body,
          createdAt: now,
        });

        if (item.comments && item.comments.length > 0) {
          for (const comment of item.comments) {
            insertComment.run({
              id: crypto.randomUUID(),
              threadId: threadId,
              author: comment.author,
              body: comment.body,
              createdAt: now,
            });
          }
        }
      }
    });

    try {
      this.logger.log('🌱 Reading external seed files and populating database...');
      seedTransaction(threadsData);
      this.logger.log('✅ Seeding completed successfully!');
    } catch (error) {
      this.logger.error('❌ Seeding failed:', error);
      throw error;
    } finally {
      db.close();
    }
  }
}