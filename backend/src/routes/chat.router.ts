import { Router } from "express";
import ChatController from "../controller/chat.controller";

const chatRouter = Router();
const chatController = new ChatController();

chatRouter.post("/", chatController.createSession);
chatRouter.get("/", chatController.getAllSections);

export default chatRouter;
