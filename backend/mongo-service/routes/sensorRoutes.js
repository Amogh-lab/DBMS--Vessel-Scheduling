import express from "express";
import { addSensorData, getSensorData } from "../controllers/sensorController.js";

const router = express.Router();

router.post("/", addSensorData);
router.get("/", getSensorData);

export default router;
