import { Request, Response } from "express";
import * as trailModel from "../models/trailModel";
import * as regionModel from"../models/regionModel"

export const getAll = async (req: Request, res: Response) => {
  try {
    const trails = await trailModel.getAllTrails();
    const displayedTrails = trails?.map((trail) => ({
      ...trail,
      created_at: trailModel.formateDate(trail.created_at),
    }));
    res.status(200).render("admin/index", { trails: displayedTrails });
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
  try {
    const trail = await trailModel.getTrailBySlug(slug);
    const regions = await regionModel.getAllRegions()
    console.log("trailbySlug", trail);
    if (trail) {
      res
        .status(200)
        .render("./admin/form", {
          trail: trail,
          regions: regions,
          action: `../update/${trail.id}`,

        });
    }
  } catch (err) {
    console.error(err);
    res.status(400).send("Check terminal console for the actual error");
  }
};
export const getCreateTrailForm = async(req: Request, res: Response) => {
  const regions = await regionModel.getAllRegions()
  res.render("admin/form", {
    trail: null,
    regions: regions,
    action: "/admin/create",
  });
};
export const createTrail = async (req: Request, res: Response) => {
  try {
    const trail = {...req.body,created_at: new Date().getTime()}
    await trailModel.createTrail(trail);
    res.status(201).redirect("/admin");
  } catch (error) {
    console.log(error);
    res.status(400).send("Check terminal console for the actual error");
  }
};

export const updateTrail = async (req: Request, res: Response) => {
  try {
    await trailModel.updateTrail(Number(req.params.id), req.body);
    res.status(200).redirect("/admin");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update trail entry" });
  }
};

export const delteTrail = async (req: Request, res: Response) => {
  try {
    await trailModel.deleteTrail(Number(req.params.id));
    res.status(200).redirect("/admin/");
  } catch (err) {
    console.log("delete", err);
    res.status(500).json({ error: "Failed to delete trail entry" });
  }
};

