import { Request, Response } from "express";
import * as trailModel from "../models/trailModel";
import type { Trail } from "../dataTypes/data.t";

export const getAll = async (req: Request, res: Response) => {
  try {
    const trails = await trailModel.getAllTrails();
    console.log("trails", trails);
    res.status(200).render("index", { trails: trails });
  } catch (err) {
    console.error(err);
    res.status(400).send("Check terminal console for the actual error");
  }
};

export const getTrailBySlug = async (req: Request, res: Response) => {
  const slug = req.params.slug ? String(req.params.slug) : "";
  try {
    const trail = await trailModel.getTrailBySlug(slug);
    console.log("trailbySlug", trail);
    res.status(200).render("index", { trailbySlug: trail });
  } catch (err) {
    console.error(err);
    res.status(400).send("Check terminal console for the actual error");
  }
};
