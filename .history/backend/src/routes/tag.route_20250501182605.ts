import { Router } from "express";
import TagController from "../controller/tag.controller";

const tagRouter = Router();

const tagController = new TagController();

tagRouter.post("/", tagController.createTag);
