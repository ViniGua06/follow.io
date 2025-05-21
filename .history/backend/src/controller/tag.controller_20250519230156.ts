import { NextFunction, Request, Response } from "express";
import { Tag } from "../entity/Tag";
import BadRequestError from "../models/errors/badRequest.error";
import TagServices from "../services/tag.service";

export default class TagController {
  private readonly _tagServices = new TagServices();

  getAllTags = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({
        status: "success",
        tags: await this._tagServices.selectAllTags(),
      });
    } catch (error) {
      next(error);
    }
  };

  createTags = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tagsFromBody: Omit<Tag, "id">[] = req.body.tags;

      for (const tagFromBody of tagsFromBody)
        await this._tagServices.insertTag(tagFromBody);

      res.status(201).json({ status: "success", message: "Tag criada!" });
    } catch (error) {
      next(error);
    }
  };

  associateTagToUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.params;
      const tags: Tag[] = req.body.tags;

      if (!userId) throw new BadRequestError("Usuário não fornecidos");

      await this._tagServices.associateTagToUser(tagId, userId);

      res.status(200).json({ status: "success", message: "Tag associada!" });
    } catch (error) {
      next(error);
    }
  };
}
