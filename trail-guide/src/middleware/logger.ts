
// Request logger
// Add middleware/logger.ts that writes one line per request to logs/access.log after the response finishes. Each line should include timestamp, method, URL, and status.
// Register it in app.ts before the routers so it captures every request, including the API and admin routes you add later.
// Refer to Backend Express Advanced for the logger middleware example with res.on("finish", ...)
import type { NextFunction, Request, Response } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.url}`);
  next();
}