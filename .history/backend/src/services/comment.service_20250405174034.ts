import { AppDataSource } from "../data-source";
import Comment from "../entity/Comment";
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

  getCommentsByPostId = async (post_id: string): Promise<CommentsType[]> => {
    const comments = await this._comment.findBy({ post_id: post_id });

    if (comments.length == 0)
      throw new NotFoundError(
        `Nenhum comentário encontrado para o post de ID ${post_id}`
      );

    const commentsToReturn: CommentsType[] = await Promise.all(
      comments.map(async (comment) => {
        let user = await this._user.findOneBy({ id: comment.user_id });

        const replies = await this._comment.find({
          where: { reply_id: comment.id },
        });

        const repliesToReturn = await Promise.all(
          replies.map(async (reply) => {
            let user = await this._user.findOneBy({ id: reply.user_id });

            return {
              comment: reply,
              author: user,
            };
          })
        );

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
          replies: repliesToReturn,
          numberOfReplies: repliesToReturn.length,
        };
      })
    );

    return commentsToReturn;
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
