import { AppDataSource } from "../data-source";
import { Tag } from "../entity/Tag";
import NotFoundError from "../models/errors/notFound.error";

export default class TagServices {
  private readonly _tag = AppDataSource.getRepository(Tag);

  insertTag = async (tag: Omit<Tag, "id">) => {
    await this._tag.insert(tag);
  };

  associateTagToUser = async (tagId: string, userId: string) => {
    const tag = await this._tag.findOne({ where: { id: tagId } });
    if (!tag) throw new NotFoundError("Tag não encontrada!");
  };
}
