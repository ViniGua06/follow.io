import { NextFunction, Request, Response } from "express";
import UserServices from "../services/user.service";
import { User } from "../entity/User";
import BadRequestError from "../models/errors/badRequest.error";
import JwtServices from "../services/jwt.service";
import DriveServices from "../services/drive.service";

export default class UserController {
  private readonly userServices = new UserServices();
  private readonly jwtServices = new JwtServices();
  private readonly driveServices = new DriveServices();

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await this.userServices.getUserById(id);

      res.status(200).json({ status: "succes", user: user });
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skip, take } = req.params;
      console.log("Cookies:", req.cookies);
      const users = await this.userServices.getAllUsers(
        parseInt(skip),
        parseInt(take)
      );

      res.status(200).json({
        status: "success",
        total: users.total,
        hasMore: users.hasMore,
        next: users.next,
        users: users.users,
      });
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body) throw new BadRequestError("Corpo da requisição ausente!");

      const user: Omit<User, "id"> = req.body;

      if (!user.email || !user.password || !user.name)
        throw new BadRequestError("Nome, email ou senha não fornecidos!");

      const userId = await this.userServices.insertUser(user);

      const jwt = this.jwtServices.createToken(userId);

      res.cookie("token", jwt, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      res.status(201).json({
        status: "success",
        message: `Usuario de id ${userId} foi inserido!`,
        userId: userId,
      });
    } catch (error) {
      next(error);
    }
  };

  authUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body) throw new BadRequestError("Corpo da requisição ausente!");
      const { email, password } = req.body;

      if (!email || !password)
        throw new BadRequestError("Email ou senha ausentes!");

      const userId = await this.userServices.authUser(email, password);

      const jwt = this.jwtServices.createToken(userId);

      res.cookie("token", jwt, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      res.status(200).json({
        status: "success",
        message: "Autenticação feita com sucesso!",
        userId: userId,
      });
    } catch (error) {
      next(error);
    }
  };

  uploadUserImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.query;
      await this.driveServices.seeIfAlreadyIn(`${user_id.toString()}.jpg`);
      res.status(200).json({ ola: "1" });
    } catch (error) {
      next(error);
    }
  };

  logout = (req: Request, res: Response) => {
    res
      .clearCookie("token")
      .status(200)
      .json({ status: "success", message: "Usuário deslogou" });
  };
}
