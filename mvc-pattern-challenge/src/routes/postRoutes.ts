import {Router}  from "express";
import * as postController from "../controllers/postController";


const router = Router()

router.get("/", postController.getAllPosts)
router.get("/posts/:slug",postController.getPostBySlug)
router.post("/post",postController.createPost)
router.put("/post",postController.updatePost)
router.delete("/post/:id",postController.delPost) ;
router.get("/admin",postController.getAllPostsAdmin)

export default router;


