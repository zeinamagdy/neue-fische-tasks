import {Router}  from "express";
import * as regionController from "../controllers/regionController";
import * as trailController from "../controllers/trailController";

const router = Router()

router.get("/", trailController.getAll)
router.get("/trails/:slug",trailController.getTrailBySlug)
router.get("/regions",regionController.getAll)
router.get("/regions/:slug",regionController.getRegionBySlug)

export default router