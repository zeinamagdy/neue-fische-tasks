import { getDB } from "../db/database";
import type { BlogEntry } from "../data/posts";

export const PAGE_SIZE = 10;

export function getAllPost() {
  const db = getDB();
  return db.prepare("SELECT * FROM posts").all() as BlogEntry[];
}
export function getPostByid(id: number): BlogEntry | undefined {
  const db = getDB();
  return db.prepare("SELECT * FROM posts WHERE id = ?").get(id) as BlogEntry;
}
export async function createBlogEntry(
  entry: Omit<BlogEntry, "id">,
): Promise<number> {
  const db = getDB();

  const insertPost = db.prepare(`
    INSERT INTO posts (title, teaser, author, createdAt, image, content)
    VALUES (@title, @teaser, @author, @createdAt, @image, @content)
  `);

  const result = insertPost.run(entry);
  return Number(result.lastInsertRowid!);
}

export async function updateBlogEntry(
  id: number,
  entry: Omit<BlogEntry, "id">,
): Promise<void> {
  const db = getDB();
  const updatePost = db.prepare(`
    UPDATE posts
    SET title = @title,
        teaser = @teaser,
        author = @author,
        createdAt = @createdAt,
        image = @image,
        content = @content
    WHERE id = @id
  `);

  // 2. Execute synchronously with .run()
  updatePost.run({
    id: id,
    title: entry.title,
    teaser: entry.teaser,
    author: entry.author,
    createdAt: entry.createdAt,
    image: entry.image,
    content: entry.content,
  });
}
export async function deleteBlogEntry(id: number): Promise<void> {
  const db = getDB();
  const deleteStmt = db.prepare("DELETE FROM posts WHERE id = ?"); 
  const info = deleteStmt.run({ id });
  if (info.changes === 0) {
    throw new Error(`No post found with id ${id}`);
  }
}

export function getPostBySlug(slug: string): BlogEntry | undefined {
  const posts = getAllPost();
  return posts.find((p) => slugify(p.title) === slug);
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
export function formatDate(unix: number): string {
  return new Date(unix * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
