import { NextFunction, Request, Response } from "express";

export default class TagController {
  createTag = (req: Request, res: Response, next: NextFunction) => {
    const {} = req.body;
    try {
    } catch (error) {
      next(error);
    }
  };
}
