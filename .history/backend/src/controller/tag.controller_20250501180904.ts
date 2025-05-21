import { NextFunction, Request, Response } from "express";
import { Tag } from "../entity/Tag";

export default class TagController {
  createTag = (req: Request, res: Response, next: NextFunction) => {
    const tagFromBody: Tag = req.body;
    try {
    } catch (error) {
      next(error);
    }
  };
}
