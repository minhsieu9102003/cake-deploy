import express from "express";
import { authMiddleware } from "../middlewares";
import { userController } from "../controllers";
const userRouter = express.Router();

userRouter.get("/", authMiddleware.verifyToken, userController.getOne);
userRouter.get("/:id", authMiddleware.verifyToken, userController.getOne);
userRouter.post("/", authMiddleware.verifyToken, userController.create);
userRouter.put("/:id", authMiddleware.verifyToken, userController.update);
userRouter.delete("/:id", authMiddleware.verifyToken, userController.delete);

export default userRouter;