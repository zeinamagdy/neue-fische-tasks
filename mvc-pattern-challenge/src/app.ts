import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postRoutes from "./routes/postRoutes";
import contactRoutes from "./routes/contactRoutes";
import aboutRoutes from "./routes/aboutRoute";
import { connectDB,closeDB } from "./db/database";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const assetsDir = path.join(projectRoot, "src", "assets");
const cssDir = path.join(projectRoot, "src", "css");
const viewsDir = path.join(projectRoot,"src","views")

app.use("/assets", express.static(assetsDir));
app.use("/css", express.static(cssDir));

app.set('views', viewsDir) //

const env = nunjucks.configure(viewsDir, {
  autoescape: true,
  express: app,
  watch: true,
});
app.engine('html', env.render) //
app.set('view engine', 'html');

app.use("/", postRoutes);
app.use("/contact", contactRoutes);
app.use("/about", aboutRoutes);

const port = Number(process.env.PORT) || 3000;
//DataBase connection
await connectDB();

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log("views" , viewsDir)
});
