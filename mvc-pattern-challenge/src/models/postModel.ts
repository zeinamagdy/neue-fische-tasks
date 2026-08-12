import { getDB } from "../db/database";
import type { Post } from "../data/posts";

export const PAGE_SIZE = 10;

export function getAllPost() {
  const db = getDB();
  return db.prepare("SELECT * FROM posts").all() as Post[];
}
export async function getPostByid(id: number): Promise<Post | undefined> {
  const db = getDB();
  return (await db.prepare("SELECT * FROM posts WHERE id = ?").get(id)) as Post;
}
export async function createBlogEntry(
  entry: Omit<Post, "id">,
): Promise<number> {
  const db = getDB();
 
const insertPost = db.prepare(`
    INSERT INTO posts (title, teaser, author,  imageText, content)
    VALUES (@title, @teaser, @author,  @imageText, @content)
  `);

  const result = await insertPost.run(entry);
  return Number(result.lastInsertRowid!);
}

export async function updateBlogEntry(
  id: number,
  entry: Omit<Post, "id">,
): Promise<void> {
  const db = getDB();
  const updatePost = db.prepare(`
    UPDATE posts
    SET title = @title,
        teaser = @teaser,
        author = @author,
        imageText = @imageText,
        content = @content
    WHERE id = @id
  `);

   updatePost.run({
    id: id,
    title: entry.title,
    teaser: entry.teaser,
    author: entry.author,
    imageText: entry.imageText,
    content: entry.content,
  });
}
export async function deleteBlogEntry(id: number): Promise<void> {
  const db = getDB();
  const deleteStmt = db.prepare("DELETE FROM posts WHERE id = ?");
  const info = await deleteStmt.run(id);
  if (info.changes === 0) {
    throw new Error(`No post found with id ${id}`);
  }
}
export async function getPostByAuthor(
  auther_name: string,
): Promise<Post[] | undefined > {
  const db = getDB();
    return (await db.prepare("SELECT * FROM posts INNER JOIN authors ON posts.author = authors.id WHERE name = ?"
).all(auther_name)) as Post[];


}
export function getPostBySlug(slug: string): Post | undefined {
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
