import { NextFunction, Request, Response } from "express";
import { Tag } from "../entity/Tag";
import BadRequestError from "../models/errors/badRequest.error";

export default class TagController {
  createTag = (req: Request, res: Response, next: NextFunction) => {
    try {
      const tagFromBody: Omit<Tag, "id"> = req.body;

      const { color, name } = tagFromBody;

      if (!color || !name)
        throw new BadRequestError("Nome e/ou cor não fornecidos");
    } catch (error) {
      next(error);
    }
  };

  associateTagToUser = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tagId, userId } = req.params;

      if (!tagId || !userId)
        throw new BadRequestError("Tag e/ou usuário não fornecidos");
    } catch (error) {
      next(error);
    }
  };
}
