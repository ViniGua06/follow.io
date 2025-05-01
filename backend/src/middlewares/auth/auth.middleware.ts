import { NextFunction, Request, Response } from "express";
import BadRequestError from "../../models/errors/badRequest.error";
import jwt from "jsonwebtoken";
import UnauthorizedError from "../../models/errors/unauthorized.error";

const Auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies || !req.cookies.token) {
    return next(
      new UnauthorizedError(
        "Cookies com o token de autenticação não encontrados!"
      )
    );
  }

  const token = req.cookies.token;

  jwt.verify(token, "SENHA", (error) => {
    if (error) next(new UnauthorizedError("Credenciais inválidas!"));

    next();
  });
};

export default Auth;
