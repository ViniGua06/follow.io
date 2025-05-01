import { AppDataSource } from "../data-source";
import Post from "../entity/Post";
import { User } from "../entity/User";
import NotFoundError from "../models/errors/notFound.error";

export default class PostServices {
  private readonly _post = AppDataSource.getRepository(Post);
  private readonly _user = AppDataSource.getRepository(User);

  getPostsByUserId = async (user: User): Promise<Post[]> => {
    const posts = await this._post.findBy({ user: { id: user.id } });

    if (posts.length == 0)
      throw new NotFoundError(
        `Nenhum post encontrado para o usuário de ID ${user.id}`
      );

    return posts;
  };

  insertPost = async (post: Omit<Post, "id">): Promise<string> => {
    const newPost = await this._post.insert(post);
    return newPost.identifiers[0]["id"];
  };
}
