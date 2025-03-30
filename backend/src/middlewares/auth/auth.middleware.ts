import { NextFunction, Request, Response } from "express";
import BadRequestError from "../../models/errors/badRequest.error";
import jwt from "jsonwebtoken";

const Auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies || !req.cookies.token) {
    return next(
      new BadRequestError(
        "Cookies com o token de autenticação não encontrados!"
      )
    );
  }

  const token = req.cookies.token;

  jwt.verify(token, "SENHA", (error) => {
    if (error) next(new BadRequestError("Credenciais inválidas!"));

    next();
  });
};

export default Auth;
