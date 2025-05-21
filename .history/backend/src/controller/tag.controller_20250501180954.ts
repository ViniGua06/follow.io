import { NextFunction, Request, Response } from "express";
import { Tag } from "../entity/Tag";

export default class TagController {
  createTag = (req: Request, res: Response, next: NextFunction) => {
    try {
      const tagFromBody: Omit<Tag, "id"> = req.body;

      const {} = tagFromBody

      if (!tag)
    } catch (error) {
      next(error);
    }
  };
}
