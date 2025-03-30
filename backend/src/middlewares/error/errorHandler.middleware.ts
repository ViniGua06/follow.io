import { NextFunction, Request, Response } from "express";
import NotFoundError from "../../models/errors/notFound.error";
import PersonalizedError from "../../models/errors/error";

function ErrorHandler(
  error: Error | PersonalizedError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);
  return res
    .status(error instanceof PersonalizedError ? error.statusCode : 500)
    .json({
      status: "error",
      message:
        error instanceof PersonalizedError
          ? error.message
          : "Internal Server Error",
    });
}

export default ErrorHandler;
