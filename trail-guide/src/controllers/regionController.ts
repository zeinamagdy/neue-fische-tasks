import { Request, Response } from "express";
import * as regionModel from "../models/regionModel";


export const getAll= async(req: Request,res: Response)=>{
    try{
        const regions = await regionModel.getAllRegions();
        res.status(200).render("index",{"regions": regions})
    }catch(err){
        console.error(err)
        res.status(400).send("Check terminal console for the actual error")
    }

}
export const getRegionBySlug= async(req: Request,res: Response)=>{
      const slug = req.params.slug ? String(req.params.slug) : "";

    try{
        const regions = await regionModel.getRegionBySlug(slug);
        res.status(200).render("index",{"regions": regions})
    }catch(err){
        console.error(err)
        res.status(400).send("Check terminal console for the actual error")
    }

}