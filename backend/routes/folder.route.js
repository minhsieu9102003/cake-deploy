import express from "express";
import { authMiddleware } from "../middlewares";
import { folderController } from "../controllers";
const folderRouter = express.Router();

folderRouter.get("/", authMiddleware.verifyToken, folderController.getAll);
folderRouter.get("/:id", authMiddleware.verifyToken, folderController.getOne);
folderRouter.post("/", authMiddleware.verifyToken, folderController.create);
folderRouter.put("/:id", authMiddleware.verifyToken, folderController.update);
folderRouter.delete("/:id", authMiddleware.verifyToken, folderController.delete);

export default folderRouter;