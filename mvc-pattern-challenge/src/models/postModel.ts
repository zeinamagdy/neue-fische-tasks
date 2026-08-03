import type { Post } from "../data/posts";
import { seedPosts } from "../data/posts";
export const PAGE_SIZE = 2;

export function loadPosts(): Post[] {
  return seedPosts;
}
export function getPostBySlug(slug:string):BlogEntry |undefined {
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
/*-------------------*/
import { getDB } from "../db/database";
import type { BlogEntry } from "../data/posts";

export function getAllPost() {
    const db = getDB();
      return  db.prepare("SELECT * FROM posts").all() as BlogEntry[];
}
export function getPostByid (id:number):BlogEntry |undefined{
  const db = getDB()
  return db.prepare("SELECT * FROM posts WHERE id = ?").get(id) as BlogEntry
}