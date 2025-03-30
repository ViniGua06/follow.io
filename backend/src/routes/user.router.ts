import { Router } from "express";
import UserController from "../controller/user.controller";
import Auth from "../middlewares/auth/auth.middleware";

const userRouter = Router();

const userController = new UserController();

userRouter.get("/all/skip/:skip/take/:take", Auth, userController.getAllUsers);
userRouter.post("/", userController.createUser);
userRouter.post("/auth", userController.authUser);
userRouter.post("/logout", userController.logout);

export default userRouter;
