import { Request, Response, NextFunction } from "express";
import * as postModel from "../models/postModel";

export const getAllPosts = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const posts = postModel.getAllPost();
    console.log("dbposts", posts.length);
    //   const posts = postModel.loadPosts();
    const authorFilter =
      typeof req.query.author === "string" ? req.query.author.trim() : "";
    const sort = req.query.sort === "oldest" ? "oldest" : "newest";
    const page =
      typeof req.query.page === "string" &&
      Number.isInteger(Number(req.query.page))
        ? Math.max(1, Number(req.query.page))
        : 1;
    const filteredPosts = authorFilter
      ? posts.filter((post) =>
          post.author.toLowerCase().includes(authorFilter.toLowerCase()),
        )
      : posts;

    const sortedPosts = [...filteredPosts].sort((a, b) => {
      if (sort === "oldest") {
        return a.createdAt - b.createdAt;
      }
      return b.createdAt - a.createdAt;
    });

    const totalPages = Math.max(
      1,
      Math.ceil(sortedPosts.length / postModel.PAGE_SIZE),
    );
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * postModel.PAGE_SIZE;
    const pagedPosts = sortedPosts.slice(start, start + postModel.PAGE_SIZE);

    const view = pagedPosts.map((post) => ({
      ...post,
      slug: postModel.slugify(post.title),
      createdAt: postModel.formatDate(post.createdAt),
    }));

    // console.log(view)

    res.render("index", {
      posts: view,
      controls: {
        author: authorFilter,
        sort,
        page: currentPage,
        totalPages,
        hasPrev: currentPage > 1,
        hasNext: currentPage < totalPages,
      },
    });
  } catch (error) {
    console.error("REAL ERROR ON / ROUTE:", error);
    res.status(500).send("Check terminal console for the actual error");
  }
};

export const getPostsByAuthor = async (req: Request, res: Response) => {
  console.log(req.params.author);
  const author = req.params.author ? String(req.params.author) : "";
  try {
    const posts = await postModel.getPostByAuthor(author);
    console.log("posts", posts);
    res.status(200).render("index", { posts: posts });
  } catch (err) {
    console.error(err);
    res.status(400).send("Check terminal console for the actual error");
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("req", req.body);
  try {
    const lastPostId = await postModel.createBlogEntry(req.body);
    const posts = postModel.getAllPost();
    res.status(201).render("admin/index", { posts: posts, lastId: lastPostId });
  } catch (error) {
    console.log(error);
    res.status(400).send("Check terminal console for the actual error");
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    await postModel.updateBlogEntry(Number(req.params.id), req.body);
    const posts = postModel.getAllPost();
    res.status(200).render("admin/index", { posts: posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update blog entry" });
  }
};

export const delPost = async (req: Request, res: Response) => {
  try {
    await postModel.deleteBlogEntry(Number(req.params.id));
    const posts = postModel.getAllPost();
    res.status(200).render("admin/index", { posts: posts });
  } catch (err) {
    console.log("delete", err);
    res.status(500).json({ error: "Failed to delete blog entry" });
  }
};
export const getPostBySlug = (req: Request, res: Response) => {
  const slug = Array.isArray(req.params.slug)
    ? req.params.slug[0]
    : req.params.slug;

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    res.status(400).send("Invalid slug");
    return;
  }
  const post = postModel.getPostBySlug(slug);
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }
  res.render("post", {
    post: { ...post, createdAt: postModel.formatDate(post.createdAt) },
  });
};

export const getAllPostsAdmin = async (_: any, res: Response) => {
  const posts = await postModel.getAllPost();
  console.log("test admin", posts);
  try {
    res.status(200).render("admin/index", { posts: posts });
  } catch (err) {
    console.error(err);
    res.status(400).send("Check terminal console for the actual error");
  }
};
