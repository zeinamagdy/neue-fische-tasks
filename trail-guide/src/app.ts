import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { connectDB, closeDB } from "./models/db";
import "dotenv/config";
import websiteRouter from "./routes/websiteRoutes"
const app = express();
const port = Number(process.env.PORT) || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");
const viewsDir = path.join(projectRoot, "views", "/");
const publicDir = path.join(projectRoot, "public");
console.log("views", viewsDir);

app.use(express.static(publicDir));
app.set("views", viewsDir);

const nunjucks_env = nunjucks.configure(viewsDir, {
  autoescape: true,
  express: app,
  watch: true,
});
app.engine("html", nunjucks_env.render);
app.set("view engine", "html");

connectDB();

app.use("/", websiteRouter);

process.on("SIGINT", async () => {
  console.log("SIGINT received. Closing database connection...");
  await closeDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Closing database connection...");
  await closeDB();
  process.exit(0);
});

async function init() {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

init();
