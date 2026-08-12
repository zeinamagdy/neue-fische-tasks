import { writeFile } from "node:fs/promises";

import { Request, Response, NextFunction } from "express";

async function createTextFile() {
  try {
    await writeFile("text.txt", "", { encoding: "utf8" });
  } catch (error) {
    console.error(error);
  }
}
export async function logger(req: Request, res: Response, next: NextFunction) {
  const { method, ip, originalUrl: url } = req;
  const date = new Date().toISOString();
  await createTextFile();
  console.log([date, method, ip, url].join(" ") + "/n");
  next();
}
