import { AppDataSource } from "../data-source";
import Comment from "../entity/Comment";
import { User } from "../entity/User";
import NotFoundError from "../models/errors/notFound.error";

type CommentsType = {
  comment: Comment;
  author: Omit<User, "password">;
};

export default class CommentServices {
  private readonly _comment = AppDataSource.getRepository(Comment);
  private readonly _user = AppDataSource.getRepository(User);

  getCommentsByPostId = async (post_id: string): Promise<CommentsType[]> => {
    const comments = await this._comment.findBy({ post_id: post_id });

    if (comments.length == 0)
      throw new NotFoundError(
        `Nenhum comentário encontrado para o post de ID ${post_id}`
      );

    const commentsToReturn: CommentsType[] = await Promise.all(
      comments.map(async (comment) => {
        let user = await this._user.findOneBy({ id: comment.user_id });

        if (!user) {
          user = {
            id: "excluded",
            name: "Conta excluída",
            email: "excluded@excluded.com",
            password: "excluded",
          } as User;
        }

        return {
          comment: comment,
          author: user,
        };
      })
    );

    return commentsToReturn;
  };

  insertComment = async (comment: Omit<Comment, "id">): Promise<string> => {
    const newComment = await this._comment.insert(comment);
    return newComment.identifiers[0]["id"];
  };
}
