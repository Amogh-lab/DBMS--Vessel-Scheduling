import express from "express";
import { addAISLog, getAISLog } from "../controllers/aisController.js";

const router = express.Router();

router.post("/", addAISLog);
router.get("/:id", getAISLog);

export default router;
