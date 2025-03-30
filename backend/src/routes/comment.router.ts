import { Router } from "express";
import CommentController from "../controller/comment.controller";

const commentRouter = Router();
const commentController = new CommentController();

commentRouter.get("/post/:post_id", commentController.getComentsByPost);
commentRouter.post("/post/:post_id", commentController.createComment);

export default commentRouter;
