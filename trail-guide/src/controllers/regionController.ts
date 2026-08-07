import { Request, Response } from "express";
import * as regionModel from "../models/regionModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const regions = await regionModel.getAllRegions();
    res.status(200).render("regions", { regions: regions });
  } catch (err) {
    console.error(err);
    res.status(400).send("Check terminal console for the actual error");
  }
};
export const getRegionBySlug = async (
  req: Request<{ slug: string }>,
  res: Response,
) => {
  const slug = req.params.slug ? String(req.params.slug) : "";
  try {
    const region = await regionModel.getRegionBySlug(slug);
    console.log("detailes  region", region)
    res.status(200).render("region", { region: region });
  } catch (err) {
    console.error(err);
    res.status(400).send("Check terminal console for the actual error");
  }
};
