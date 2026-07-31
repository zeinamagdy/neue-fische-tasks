import { Response } from "express";

export const about = (_, res: Response) => {
  res.render("./about.html");
};
