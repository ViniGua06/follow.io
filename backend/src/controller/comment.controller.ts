import { NextFunction, Request, Response } from "express";
import BadRequestError from "../models/errors/badRequest.error";
import CommentServices from "../services/comment.service";
import Comment from "../entity/Comment";

export default class CommentController {
  _commentsServices = new CommentServices();

  getComentsByPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { post_id } = req.params;

    try {
      if (!post_id) throw new BadRequestError("Post_id não fornecido!");

      const comments = await this._commentsServices.getCommentsByPostId(
        post_id
      );

      res.status(200).json({ status: "success", comments: comments });
    } catch (error) {
      next(error);
    }
  };

  createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body) throw new BadRequestError("Corpo da requisição ausente!");

      const commentFromBody: Omit<Comment, "id" | "post_id"> = req.body;
      const { post_id } = req.params;

      const comment = new Comment();
      comment.text = commentFromBody.text;
      comment.user_id = commentFromBody.user_id;
      comment.post_id = post_id;
      comment.reply_id = commentFromBody.reply_id;

      const newCommentId = await this._commentsServices.insertComment(comment);

      res.status(201).json({
        status: "success",
        message: `Comentário de ID ${newCommentId} foi inserido!`,
      });
    } catch (error) {
      next(error);
    }
  };
}
