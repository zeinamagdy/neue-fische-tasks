import { Request, Response ,NextFunction} from "express";
import * as postModel from "../models/postModel";

export const test =(_, res:Response)=>{
    res.send("TEST OK")
}
export const getAllPosts = (req: Request, res: Response, next: NextFunction) => {

try {
  const posts = postModel.getAllPost()
 console.log("dbposts",posts.length)
//   const posts = postModel.loadPosts();
  const authorFilter = typeof req.query.author === "string" ? req.query.author.trim() : "";
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

export const getPostBySlug = (req: Request, res: Response) => {
  const slug = Array.isArray(req.params.slug)
    ? req.params.slug[0]
    : req.params.slug;

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    res.status(400).send("Invalid slug");
    return;
  }
  const post  = postModel.getPostBySlug(slug);
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }
  res.render("post", {
    post: { ...post, createdAt: postModel.formatDate(post.createdAt) },
  });
};

export const getAllPostsAdmin =(_,res:Response)=>{
      const posts = postModel.loadPosts();
      res.render("admin/index",posts)

}