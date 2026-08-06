import { open, Database } from "sqlite";
import sqlite3 from "sqlite3";
import path from"path";
import "dotenv/config";

const dbPath = process.env.DB_PATH || "./data/trail-guide.db";
const DB_FILE = path.resolve(process.cwd(), dbPath);

let db: Database | null = null;


export async function connectDB(): Promise<Database> {
  db = await open({
    filename: DB_FILE,
    driver: sqlite3.Database,
  });
  console.log("connetced")
  return db;
}

export function getDB(): Database {
  if (!db) {
    throw new Error("Database not connected. Call connectDB() first.");
  }
  return db;
}

export async function closeDB(): Promise<void> {
  if (db) {
    await db.close();
    db = null;
  }
}
