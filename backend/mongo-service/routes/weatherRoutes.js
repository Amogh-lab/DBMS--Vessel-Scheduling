import express from "express";
import { addWeatherData, getWeatherData } from "../controllers/weatherController.js";

const router = express.Router();

router.post("/", addWeatherData);
router.get("/", getWeatherData);

export default router;
