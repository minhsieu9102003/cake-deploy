import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import folderController from "../controllers/folder.controller.js";
const folderRouter = express.Router();

folderRouter.get("/", authMiddleware.verifyToken, folderController.getAll);
folderRouter.get("/my/:userId", authMiddleware.verifyToken, folderController.getMyFolders);
folderRouter.get("/:id", authMiddleware.verifyToken, folderController.getOne);
folderRouter.post("/", authMiddleware.verifyToken, folderController.create);
folderRouter.put("/:id", authMiddleware.verifyToken, folderController.update);
folderRouter.delete("/:id", authMiddleware.verifyToken, folderController.deleteFolder);

folderRouter.put("/add-course/:folderId/:courseId", authMiddleware.verifyToken, folderController.addCourse);
folderRouter.put("/delete-course/:folderId/:courseId", authMiddleware.verifyToken, folderController.deleteCourse);

// get courses in a folder
folderRouter.get("/courses/:folderId", authMiddleware.verifyToken, folderController.getCoursesInFolder);

export default folderRouter;