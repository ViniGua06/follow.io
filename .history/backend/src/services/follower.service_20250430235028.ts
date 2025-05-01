import { AppDataSource } from "../data-source";
import Follower from "../entity/Follower";
import { User } from "../entity/User";
import NotFoundError from "../models/errors/notFound.error";

export default class FollowerServices {
  private readonly _follower = AppDataSource.getRepository(Follower);

  getFollowersByUserId = async (user: User): Promise<User[]> => {
    const followers = await this._follower.findBy({ followed: user });

    if (followers.length == 0)
      throw new NotFoundError(
        `Nenhum seguidor encontrado para o usuário de ID ${user_id}`
      );

    const query = await this._follower.query(
      "SELECT * FROM users AS u INNER JOIN followers AS f ON u.id = f.following WHERE f.followed = $1",
      [user_id]
    );

    console.log("OLLLLLLLAAAAAA");
    console.log(query);

    const users = query as User[];
    return users;
  };

  getFollowingUsersByUserId = async (user_id: string) => {
    const followers = await this._follower.findBy({ followed: user_id });

    if (followers.length == 0)
      throw new NotFoundError(
        `Nenhum seguidor encontrado para o usuário de ID ${user_id}`
      );

    const query = await this._follower.query(
      "SELECT * FROM users AS u INNER JOIN followers AS f ON u.id = f.followed WHERE f.following = $1",
      [user_id]
    );

    console.log("OLLLLLLLAAAAAA");
    console.log(query);

    const users = query as User[];
    return users;
  };
}
