import {Router}  from "express";
import * as adminController from "../controllers/adminController";

const adminRouter = Router()

adminRouter.get("/", adminController.getAll)
adminRouter.get("/edit-form/",adminController.getCreateTrailForm)
adminRouter.get("/edit-form/:slug",adminController.getTrailBySlug)
adminRouter.post("/create",adminController.createTrail)
adminRouter.post("/update/:id",adminController.updateTrail)
adminRouter.get("/delete/:id",adminController.delteTrail) ;

export default adminRouter;