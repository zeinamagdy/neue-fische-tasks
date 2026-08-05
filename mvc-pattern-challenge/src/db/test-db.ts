import Database from "better-sqlite3";

// 1. Initialize in-memory DB (no server, no disk file needed)
const db = new Database(':memory:');

db.exec(`
  CREATE TABLE posts_test (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT
  );
   CREATE TABLE IF NOT EXISTS authors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL);
`);
// 3. Test your INSERT query
const insert = db.prepare('INSERT INTO posts_test (title, content) VALUES (@title, @content)');
const info = insert.run({ title: 'Test Post', content: 'Hello World' });
console.log('Insert Info:', info); // { changes: 1, lastInsertRowid: 1 }

// 4. Test your UPDATE query
const update = db.prepare('UPDATE posts_test SET title = @title WHERE id = @id');
const updateInfo = update.run({ id: info.lastInsertRowid, title: 'Updated Title' });
console.log('Update Info:', updateInfo); // { changes: 1 }

// 5. Verify the result
const result = db.prepare('SELECT * FROM posts_test WHERE id = ?').get(info.lastInsertRowid);
console.log('DB Record:', result);