import {Router}  from "express";
import * as adminController from "../controllers/adminController";

const adminRouter = Router()

adminRouter.get("/", adminController.getAll)
adminRouter.get("/form/",adminController.getCreateTrailForm)
adminRouter.get("/form/:slug",adminController.getTrailBySlug)
adminRouter.post("/create",adminController.createTrail)
adminRouter.post("/update/:id",adminController.updateTrail)
adminRouter.get("/delete/:id",adminController.delteTrail) ;

export default adminRouter;