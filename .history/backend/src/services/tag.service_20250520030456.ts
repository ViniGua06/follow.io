import { Like } from "typeorm";
import { AppDataSource } from "../data-source";
import { Tag } from "../entity/Tag";
import { User } from "../entity/User";
import NotFoundError from "../models/errors/notFound.error";

export default class TagServices {
  private readonly _tag = AppDataSource.getRepository(Tag);
  private readonly _user = AppDataSource.getRepository(User);

  selectAllTags = async () => {
    return await this._tag.find({ take: 20 });
  };

  insertTag = async (tag: Omit<Tag, "id">) => {
    await this._tag.insert(tag);
  };

  selectTagsByName = async (name: string, exact: boolean) => {
    return await this._tag.find({
      where: {
        name: exact ? name : Like(`%${name}%`),
      },
    });
  };

  associateTagToUser = async (tagId: string, userId: string) => {
    const tag = await this._tag.findOne({ where: { id: tagId } });
    const user = await this._user.findOne({
      where: { id: userId },
      relations: ["tags"],
    });

    if (!tag || !user)
      throw new NotFoundError("Tag e/ou usuário não encontrados!");

    const userTag = user.tags.find((userTag) => userTag.id == tag.id);
    if (userTag) return;

    user.tags.push(tag);
    await this._user.save(user);
  };
}
