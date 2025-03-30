import { Router } from "express";

const followerRouter = Router();

// Get user followers
followerRouter.get("/user/:user_id");

// Get people the user is following
followerRouter.get("/user/:user_id/following");

// Follow someone
followerRouter.post("/user/:user_id/following/:follow_id");

// Unfollow someone
followerRouter.delete("/user/:user_id/following/:follow_id");

export default followerRouter;
