import { NextFunction, Request, Response } from "express";
import BadRequestError from "../models/errors/badRequest.error";
import FollowerServices from "../services/follower.service";
import UserServices from "../services/user.service";

export default class FollowerController {
  private readonly _followerServices = new FollowerServices();
  private readonly _userServices = new UserServices();

  getUsersFollowers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { user_id } = req.params;

      if (!user_id) throw new BadRequestError("Id do usuário não fornecido!");

      const user = await this._userServices.getUserById(user_id);

      const followers = await this._followerServices.getFollowersByUserId(user);

      res.status(200).json({
        status: "success",
        count: followers.length,
        followers: followers,
      });
    } catch (error) {
      next(error);
    }
  };
}
