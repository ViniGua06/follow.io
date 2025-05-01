import { AppDataSource } from "../data-source";
import Comment from "../entity/Comment";
import Post from "../entity/Post";
import { User } from "../entity/User";
import NotFoundError from "../models/errors/notFound.error";

export default class CommentServices {
  private readonly _comment = AppDataSource.getRepository(Comment);
  private readonly _user = AppDataSource.getRepository(User);

  getCommentsByPostId = async (post: Post): Promise<Comment[]> => {
    const comments = await this._comment.findBy({ post: post });

    if (comments.length == 0)
      throw new NotFoundError(
        `Nenhum comentário encontrado para o post de ID ${post.id}`
      );

    return comments;
  };

  getLastCommentsByPost = async (post: Post): Promise<Comment[]> => {
    const comments = await this._comment.find({
      where: {
        post: post,
      },
      take: 5,
      order: {
        created_at: "DESC",
      },
    });

    if (comments.length == 0 || !comments)
      throw new NotFoundError(
        `Nenhum comentário encontrado para post de id ${post.id}`
      );

    return comments;
  };

  insertComment = async (comment: Omit<Comment, "id">): Promise<string> => {
    const newComment = await this._comment.insert(comment);
    return newComment.identifiers[0]["id"];
  };
}
