import express from "express";
import nunjucks from "nunjucks";
import path from "path";
import { getPosts } from "./services";

const app = express();
const port = 2500;
app.use(
  "/theme",
  express.static(
    path.join(__dirname, "../node_modules/startbootstrap-clean-blog/dist"),
  ),
);
app.use("/static", express.static(path.join(process.cwd(), "static/assets")));

nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
  watch: true,
});
const posts = getPosts();

app.get("/", (_, res) => {
  res.render("home.html", {
    pageTitle: "BLog",
    headerTitle: "BLog",
    headerSubtitle: "A Blog Theme by Start Bootstrap",
    posts: posts.map((post) => ({
      ...post,
      createdAt: new Date(post.createdAt * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    })),
  });
});

app.get("/post/:date", (req, res) => {
  const date = req.params.date;
  const post = posts.find((p) => {
    const postDate = new Date(p.createdAt * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return postDate === date;
  });
  console.log("post", post);
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }

  res.render("post_details.html", {
    pageTitle: post.title,
    post: {
      ...post,
      createdAt: new Date(post.createdAt * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
