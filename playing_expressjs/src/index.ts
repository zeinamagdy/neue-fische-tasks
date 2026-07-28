import express from "express";
import { Request, Response, NextFunction } from "express";
//import * as z from "zod"; //https://github.com/colinhacks/zod
import cors from "cors";
import { bookmarks } from "./data/data.t";


const app = express();
const port = 2500;
//midelware
// Allow requests from ANY domain
const corsOptions = {
  origin: "http://localhost:2500", // Only allow requests from your frontend app
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies/auth headers to be sent
};
app.use(cors(corsOptions));
app.use(express.json());

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log("log it " + req + res);
  next();
};

app.use(logger);

app.get("/bookmarks", (req, res) => {
  const { tag } = req.query;
  if (tag) {
    const fliteredBytag = bookmarks.filter((book) => book.tag == tag);
    return res.json(fliteredBytag);
  }
  res.json(bookmarks);
});

app.get("/bookmarks/:id", (req, res) => {
  const { id } = req.params;
  const bookmark = bookmarks.find((book) => String(book.id) == id);
  if (!bookmark)
    return res.status(404).json({
      message: "Bookmark not found",
    });
  return res.json(bookmark);
});

app.post("/bookmarks", (req, res) => {
  console.log(req.body);
  const { id, url, title, tag } = req.body;

  if (!url || !title) {
    return res
      .status(400)
      .json({
        error:
          "Missing required field: " +
          (url ? "" : "url ") +
          (title ? "" : "title"),
      });
  }

  const addBookmark = {
    id,
    url,
    title,
    tag,
  };

  return res.status(201).json(addBookmark);
});

app.delete("/bookmarks/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = bookmarks.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Bookmark not found" });
  }
  const [deletedBookmark] = bookmarks.splice(index, 1);
  return res.status(200).json(deletedBookmark);
});

app.patch("/bookmarks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = bookmarks.findIndex((b) => b.id == id);
  console.log("index", index);
  if (index === -1)
    return res.status(404).json({ error: "Bookmark not found" });

  const bookmark = bookmarks[index];
  Object.assign(bookmark, req.body, { id });

  // bookmarks[index] = updatedBookmark;
  return res.status(200).json(bookmark);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
