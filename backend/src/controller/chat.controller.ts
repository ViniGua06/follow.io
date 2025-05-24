import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import ChatServices from "../services/chat.service";
import Chat from "../entity/Chat";
import UserServices from "../services/user.service";

export default class ChatController {
  private readonly _chatServices = new ChatServices();
  private readonly _userServices = new UserServices();

  public getAllSections = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(200).json({
      status: "success",
      sessions: await this._chatServices.selectAllChats(),
    });
  };

  public createSession = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users: string[] = req.body.users;
      const chat: Chat = new Chat();

      chat.users = [];

      for (const userId of users) {
        const user = await this._userServices.getUserById(userId);
        chat.users.push(user);
      }

      const insertedChatId = await this._chatServices.insertChat(chat);

      res.status(201).json({
        status: "success",
        message: `Sessão de Id ${insertedChatId} aberta!`,
      });
    } catch (error) {
      next(error);
    }
  };
}
