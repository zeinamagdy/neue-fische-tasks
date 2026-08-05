import {Router}  from "express";
import * as postController from "../controllers/postController";


const router = Router()

router.get("/", postController.getAllPosts)
router.get("/posts/:author",postController.getPostsByAuthor)
router.get("/posts/:slug",postController.getPostBySlug)
router.post("/posts/create",postController.createPost)
router.post("/posts/update/:id",postController.updatePost)
router.post("/posts/delete/:id",postController.delPost) ;
router.get("/admin",postController.getAllPostsAdmin)

export default router;


