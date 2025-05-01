import { NextFunction, Request, Response } from "express";
import BadRequestError from "../models/errors/badRequest.error";
import CommentServices from "../services/comment.service";
import Comment from "../entity/Comment";
import { getRepository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import Post from "../entity/Post";

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

      const { userId, text, content, image, replyId } = req.body;
      const { post_id } = req.params;

      // Buscando o Post e o User
      const postRepository = AppDataSource.getRepository(Post);
      const userRepository = AppDataSource.getRepository(User);

      const post = await postRepository.findOne({ where: { id: post_id } });
      if (!post) throw new Error("Post não encontrado");

      const user = await userRepository.findOne({
        where: { id: userId },
      });
      if (!user) throw new Error("Usuário não encontrado");

      const comment = new Comment();
      comment.text = text;
      comment.user = user; // Atribuindo o usuário diretamente
      comment.post = post; // Atribuindo o post diretamente
      comment.replyTo = replyId; // Atribuindo o reply_id se houver

      // Agora você pode salvar o comentário com todas as relações corretas
      const newComment = await this._commentsServices.insertComment(comment);

      res.status(201).json({
        status: "success",
        message: `Comentário de ID ${newComment.id} foi inserido!`,
      });
    } catch (error) {
      next(error);
    }
  };
}
