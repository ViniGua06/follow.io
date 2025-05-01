import { Router } from "express";
import UserController from "../controller/user.controller";
import multer from "multer";

const userRouter = Router();

const userController = new UserController();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads");
  },
  filename: (req, file, cb) => {
    const { user_id } = req.query;

    cb(null, user_id.toString());
  },
});

const upload = multer({ storage });

userRouter.get("/all/skip/:skip/take/:take", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/", userController.createUser);
userRouter.post("/auth", userController.authUser);
userRouter.post("/logout", userController.logout);
userRouter.post(
  "/image/upload",
  upload.single("image"),
  userController.uploadUserImage
);

export default userRouter;
