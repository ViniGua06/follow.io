import { Router } from "express";
import TagController from "../controller/tag.controller";

const tagRouter = Router();

const tagController = new TagController();

tagRouter.post("/", tagController.createTags);
tagRouter.post("/user/:userId", tagController.associateTagToUser);
tagRouter.get("/", tagController.getAllTags);
tagRouter.get("/");

export default tagRouter;
