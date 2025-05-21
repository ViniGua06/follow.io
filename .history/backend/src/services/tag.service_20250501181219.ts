import { AppDataSource } from "../data-source";
import { Tag } from "../entity/Tag";

export default class TagServices {
  private readonly _tag = AppDataSource.getRepository(Tag);

  insertTag = (tag: Omit<Tag, "id">) => {};
}
