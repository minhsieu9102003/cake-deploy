import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import authController from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authMiddleware.verifyToken, authController.logout);

export default authRouter;