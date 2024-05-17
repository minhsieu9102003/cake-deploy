import express from "express";
import { search } from "../controllers/other.controller.js";
const router = express.Router();

router.get("/search/:query", search);

export default router;