import { Router } from "express";
import PostController from "../controller/post.controller";

const postRouter = Router();
const postController = new PostController();

postRouter.get("/user/:user_id", postController.getPostsByUser);
postRouter.post("/", postController.createPost);

export default postRouter;
