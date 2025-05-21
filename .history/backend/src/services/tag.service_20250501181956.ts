import { AppDataSource } from "../data-source";
import { Tag } from "../entity/Tag";
import { User } from "../entity/User";
import NotFoundError from "../models/errors/notFound.error";

export default class TagServices {
  private readonly _tag = AppDataSource.getRepository(Tag);
  private readonly _user = AppDataSource.getRepository(User);

  insertTag = async (tag: Omit<Tag, "id">) => {
    await this._tag.insert(tag);
  };

  associateTagToUser = async (tagId: string, userId: string) => {
    const tag = await this._tag.findOne({ where: { id: tagId } });
    const user = await this._user.findOne({ where: { id: userId } });

    if (!tag || !user)
      throw new NotFoundError("Tag e/ou usuário não encontrados!");

    user.tags.push(tag);
    await this._user.save(user);
  };
}
