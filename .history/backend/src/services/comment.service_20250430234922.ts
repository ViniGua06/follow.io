import { AppDataSource } from "../data-source";
import Comment from "../entity/Comment";
import Post from "../entity/Post";
import { User } from "../entity/User";
import NotFoundError from "../models/errors/notFound.error";

type ReplyTipe = {
  author: User;
  comment: Comment;
};

type CommentsType = {
  comment: Comment;
  author: Omit<User, "password">;
  numberOfReplies: number;
  replies: ReplyTipe[];
};

export default class CommentServices {
  private readonly _comment = AppDataSource.getRepository(Comment);
  private readonly _user = AppDataSource.getRepository(User);

  getCommentsByPostId = async (post: Post): Promise<CommentsType[]> => {
    const comments = await this._comment.findBy({ post: post });

    if (comments.length == 0)
      throw new NotFoundError(
        `Nenhum comentário encontrado para o post de ID ${post.id}`
      );

    return comments;
  };

  getLastCommentsByPost = async (post_id: string): Promise<Comment[]> => {
    const comments = await this._comment.find({
      where: {
        post_id: post_id,
      },
      take: 5,
      order: {
        created_at: "DESC",
      },
    });

    if (comments.length == 0 || !comments)
      throw new NotFoundError(
        `Nenhum comentário encontrado para post de id ${post_id}`
      );

    return comments;
  };

  insertComment = async (comment: Omit<Comment, "id">): Promise<string> => {
    const newComment = await this._comment.insert(comment);
    return newComment.identifiers[0]["id"];
  };
}
