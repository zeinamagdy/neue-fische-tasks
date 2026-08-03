import Database from "better-sqlite3";
import path from "path";

const DB_FILE = path.join(process.cwd(), "src/db", "blog.db");
console.log("file", DB_FILE);
// Database from "better-sqlite3" is a class/type
let db: Database.Database | null = null;

export function connectDB(): Database.Database {
  if (!db) {
    db = new Database(DB_FILE);
    // Recommended performance setting for SQLite
    db.pragma("journal_mode = WAL");
  }
  return db;
}

export function getDB(): Database.Database {
  if (!db) {
    // Automatically initialize if it hasn't been called yet
    return connectDB();
  }
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      teaser TEXT NOT NULL,
      author TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      image TEXT NOT NULL,
      content TEXT NOT NULL
    )
  `);
  return db;
}

export function closeDB(): void {
  if (db) {
    db.close();
    db = null;
  }
}
