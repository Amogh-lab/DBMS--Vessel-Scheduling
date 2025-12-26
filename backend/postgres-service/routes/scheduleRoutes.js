import express from "express";
import {
  fetchAllSchedules,
  addSchedule
} from "../controllers/scheduleController.js";

const router = express.Router();

router.get("/", fetchAllSchedules);
router.post("/", addSchedule);

export default router;
