import express  from "express";
import crypto from "crypto"
import cors from "cors";
import path from "path";
import "dotenv/config";
import nunjucks from "nunjucks";
import {  appendFile,writeFile } from "node:fs/promises";

const app = express();
const port = process.env.PORT || 2500;

//app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// const LOG_DIR = path.join(process.cwd(), "logs");
// const LOG_file = path.join(LOG_DIR, "logs.txt");
nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
  watch: true,
});


async function addTextFile(uniqueId:string,message: string) {
    const messageFile = path.join(process.cwd(), ${uniqueId} + ".txt");

  await writeFile(messageFile,message, { encoding: "utf8" });
}

app.get("/", (_, res) => {
  res.render("_base.html", { title: "homepage" });
});
app.post("/submit", async (req, res) => {
  const message = req.body.message.trim();
  const uniqueId = crypto.randomUUID();
  try { 
    await addTextFile(uniqueId,message);
  } catch (err) {
    console.error(err);
  }

  console.log("message", message);

});

app.listen(port, () => {
  console.log(`App lisiting to port ${port}`);
});
