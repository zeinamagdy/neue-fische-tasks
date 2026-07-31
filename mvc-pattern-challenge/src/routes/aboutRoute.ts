import {Router}  from "express";
import * as aboutController from "../controllers/aboutController";


const router = Router()
router.get("/", aboutController.about)



export default router;
 