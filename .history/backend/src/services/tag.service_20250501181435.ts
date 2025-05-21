import { AppDataSource } from "../data-source";
import { Tag } from "../entity/Tag";

export default class TagServices {
  private readonly _tag = AppDataSource.getRepository(Tag);

  insertTag = async (tag: Omit<Tag, "id">) => {
    await this._tag.insert(tag);
  };

  associateTagToUser = async (tagId: string, userId: string) => {
    await this._tag.findOne({ where: { id: tagId } });
  };
}
