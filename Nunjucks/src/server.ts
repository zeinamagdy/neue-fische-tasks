import express from "express";
import nunjucks from "nunjucks";
import path from 'path';
const app = express();
const port = 2500;
nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
  watch: true,
});
// Always points to project-root/static regardless of where server.ts is located
app.use('/static', express.static(path.join(process.cwd(), 'static')));
app.get("/", (_, res) => {
  res.render("home.html", {
    title: "This is the home page",
  });
});
app.get("/events", (_, res) => {
  res.render("events.html", {
    events: [
       {
    name: "React Conf",
    date: "June 10, 2025",
    location: "Berlin",
    soldOut: false,
  },
  {
    name: "Vue.js Summit",
    date: "July 2, 2025",
    location: "Amsterdam",
    soldOut: true,
  },
  {
    name: "Node.js Interactive",
    date: "August 15, 2025",
    location: "London",
    soldOut: false,
  },
    ],
  });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
