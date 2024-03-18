import express from "express";
import { authMiddleware } from "../middlewares";
import { cardController } from "../controllers";
const cardRouter = express.Router();

cardRouter.get("/", authMiddleware.verifyToken, cardController.getAll);
cardRouter.get("/:id", authMiddleware.verifyToken, cardController.getOne);
cardRouter.post("/", authMiddleware.verifyToken, cardController.create);
cardRouter.put("/:id", authMiddleware.verifyToken, cardController.update);
cardRouter.delete("/:id", authMiddleware.verifyToken, cardController.delete);

export default cardRouter;