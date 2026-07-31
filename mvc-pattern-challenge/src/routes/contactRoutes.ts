import {Router}  from "express";
import * as conatctControll from "../controllers/contactController";


const router = Router()
router.get("/", conatctControll.contact)



export default router;
 