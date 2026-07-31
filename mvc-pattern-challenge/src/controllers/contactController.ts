import { Response } from "express";

export const contact = (_, res: Response) => {
  res.render("./contact.html");
};
