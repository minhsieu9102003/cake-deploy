import express from "express";
import { authMiddleware } from "../middlewares";
import { courseController } from "../controllers";
const courseRouter = express.Router();

courseRouter.get("/", authMiddleware.verifyToken, courseController.getAll);
courseRouter.get("/:id", authMiddleware.verifyToken, courseController.getOne);
courseRouter.post("/", authMiddleware.verifyToken, courseController.create);
courseRouter.put("/:id", authMiddleware.verifyToken, courseController.update);
courseRouter.delete("/:id", authMiddleware.verifyToken, courseController.delete);

export default courseRouter;