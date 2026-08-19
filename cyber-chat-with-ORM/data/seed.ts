import Database from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';

interface SeedData {
  threads: Array<{
    id?: string;
    author?: string;
    title: string;
    body: string;
  }>;
  comments: Array<{
    threadId: string;
    author: string;
    body: string;
  }>;
}

function runSeed() {
  const dbPath = path.resolve(process.cwd(), 'data/sqlite.db');
  const db = new Database(dbPath);
  db.pragma('foreign_keys = ON');

  // 1. Ensure tables exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS thread (
      id TEXT PRIMARY KEY,
      author VARCHAR(120),
      title VARCHAR(120) NOT NULL,
      body TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS comment (
      id TEXT PRIMARY KEY,
      threadId TEXT NOT NULL,
      author VARCHAR(120) NOT NULL,
      body TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (threadId) REFERENCES thread(id) ON DELETE CASCADE
    );
  `);

  // 2. Read single JSON file
  const jsonPath = path.resolve(process.cwd(), 'data/seed-data.json');
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ Seed file missing at: ${jsonPath}`);
    process.exit(1);
  }

  const seedData: SeedData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  // 3. Prepare SQL Statements
  const insertThread = db.prepare(`
    INSERT INTO thread (id, author, title, body, createdAt)
    VALUES (@id, @author, @title, @body, @createdAt)
  `);

  const insertComment = db.prepare(`
    INSERT INTO comment (id, threadId, author, body, createdAt)
    VALUES (@id, @threadId, @author, @body, @createdAt)
  `);

  // 4. Run Transaction for both tables
  const seedTransaction = db.transaction((data: SeedData) => {
    // Optional: Clear existing records before seeding
    db.prepare('DELETE FROM comment').run();
    db.prepare('DELETE FROM thread').run();

    const now = new Date().toISOString();

    // Insert Threads
    for (const thread of data.threads) {
      insertThread.run({
        id: thread.id ?? randomUUID(),
        author: thread.author ?? null,
        title: thread.title,
        body: thread.body,
        createdAt: now,
      });
    }

    // Insert Comments
    for (const comment of data.comments) {
      insertComment.run({
        id: randomUUID(),
        threadId: comment.threadId,
        author: comment.author,
        body: comment.body,
        createdAt: now,
      });
    }
  });

  try {
    console.log('🌱 Seeding database from single file...');
    seedTransaction(seedData);
    console.log(`✅ Successfully seeded ${seedData.threads.length} threads and ${seedData.comments.length} comments!`);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    db.close();
  }
}

runSeed();