import { Request, Response } from "express";
import * as trailModel from "../models/trailModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const trails = await trailModel.getAllTrails();
    console.log("trails", trails);
     const displayedTrails = trails?.map((trail) => ({
      ...trail,
      created_at: trailModel.formateDate(trail.created_at),
    }));
    res.status(200).render("index", { trails: displayedTrails });
  } catch (err) {
    console.error(err);
    res.status(400).send("Check terminal console for the actual error");
  }
};

export const getTrailBySlug = async (
  req: Request<{ slug: string }>,
  res: Response,
) => {
  const slug = req.params.slug ? String(req.params.slug) : "";
  console.log("slug", slug);
  try {
    const trail = await trailModel.getTrailBySlug(slug);
    console.log("trailbySlug", trail);
    res.status(200).render("trail-details", { trail: trail });
  } catch (err) {
    console.error(err);
    res.status(400).send("Check terminal console for the actual error");
  }
};

