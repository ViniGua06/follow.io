import { validate } from "class-validator";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import NotFoundError from "../models/errors/notFound.error";
import BadRequestError from "../models/errors/badRequest.error";
import bcrypt from "bcrypt";
import Follower from "../entity/Follower";
import { Like } from "typeorm";

export default class UserServices {
  _user = AppDataSource.getRepository(User);
  _follower = AppDataSource.getRepository(Follower);

  getUserById = async (id: string): Promise<User> => {
    const user = await this._user.findOne({
      where: { id: id },
      relations: ["posts"],
    });
    if (!user) throw new NotFoundError(`Usuário de ID ${id} não encontrado!`);

    console.log("OLA \n", user.posts);

    return user;
  };

  getUsersByName = async (name: string, exact: boolean): Promise<User[]> => {
    const users = await this._user.find({
      where: {
        name: exact ? name : Like(`${name}%`),
      },
    });

    return users;
  };

  getAllUsers = async (
    skip: number,
    take: number
  ): Promise<{
    users: User[];
    total: number;
    hasMore: boolean;
    next: number | null;
  }> => {
    const users = await this._user.find({
      skip: skip,
      take: take,
      relations: ["posts", "followers", "following", "tags"],
    });

    if (users.length == 0)
      throw new NotFoundError("Nenhum usuário encontrado!");

    const allUsers = (await this._user.find()).length;
    const afterUsers = await this._user.find({ skip: skip + take, take: take });

    return {
      users: users,
      total: allUsers,
      hasMore: afterUsers.length > 0 ? true : false,
      next: afterUsers.length > 0 ? skip + take : null,
    };
  };

  insertUser = async (userData: Omit<User, "id">): Promise<string> => {
    const user = new User();
    Object.assign(user, userData);
    await user.hashPassword();

    const errors = await validate(user);

    if (errors.length > 0) {
      throw new BadRequestError(`Email inválido!`);
    }

    try {
      const insertedUser = await this._user.insert(user);
      return insertedUser.identifiers[0]["id"];
    } catch (error) {
      throw new BadRequestError("Email já cadastrado!");
    }
  };

  authUser = async (email: string, password: string): Promise<string> => {
    const user = await this._user.findOneBy({ email: email });

    if (!user) throw new BadRequestError("Email não cadastrado!");

    console.log(user);

    console.log(user.password);

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) throw new BadRequestError("Senha inválida!");

    return user.id;
  };

  uploadImage = async (userId: string, imageUrl: string) => {
    await this._user.update({ id: userId }, { profile_picture: imageUrl });
  };
}
