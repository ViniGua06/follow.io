import { NextFunction, Request, Response } from "express";
import PostServices from "../services/post.service";
import BadRequestError from "../models/errors/badRequest.error";
import Post from "../entity/Post";
import UserServices from "../services/user.service";

export default class PostController {
  private readonly _postServices = new PostServices();
  private readonly _userServices = new UserServices();

  getPostsByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.params;

      if (!user_id) throw new BadRequestError("ID do usuário não informado!");

      const user = await this._userServices.getUserById(user_id);

      const posts = await this._postServices.getPostsByUserId(user);

      res.status(200).json({ status: "success", posts: posts });
    } catch (error) {
      next(error);
    }
  };

  createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body) throw new BadRequestError("Corpo da requisição ausente!");

      const { title, content, user_id } = req.body;

      if (!title || !content || !user_id)
        throw new BadRequestError(
          "Título, conteúdo e/ou ID do autor do post ausentes!"
        );

      const user = await this._userServices.getUserById(user_id);

      const post = new Post();
      post.content = content;
      post.title = title;
      post.user = user;

      const post_id = await this._postServices.insertPost(post);

      res.status(201).json({
        status: "success",
        message: `Post de id ${post_id} foi inserido com sucesso!`,
      });
    } catch (error) {
      next(error);
    }
  };
}
