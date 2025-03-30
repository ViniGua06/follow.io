import { AppDataSource } from "../data-source";
import Post from "../entity/Post";
import { User } from "../entity/User";
import NotFoundError from "../models/errors/notFound.error";

type PostsType = {
  author: Omit<User, "id">;
  post: Post;
};

export default class PostServices {
  private readonly _post = AppDataSource.getRepository(Post);
  private readonly _user = AppDataSource.getRepository(User);

  getPostsByUserId = async (user_id: string): Promise<PostsType[]> => {
    const posts = await this._post.findBy({ user_id: user_id });

    if (posts.length == 0)
      throw new NotFoundError(
        `Nenhum post encontrado para o usuário de ID ${user_id}`
      );

    const postsToReturn: PostsType[] = await Promise.all(
      posts.map(async (post) => {
        let user = await this._user.findOneBy({
          id: post.user_id,
        });

        if (!user) {
          user = {
            id: "excluded",
            name: "excluded",
            email: "excluded@excluded.com",
          } as User;
        }

        return {
          author: user,
          post: post,
        };
      })
    );

    return postsToReturn;
  };

  insertPost = async (post: Omit<Post, "id">): Promise<string> => {
    const newPost = await this._post.insert(post);
    return newPost.identifiers[0]["id"];
  };
}
