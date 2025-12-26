import express from "express";
import { fetchAllPlants, addPlant } from "../controllers/plantController.js";

const router = express.Router();

router.get("/", fetchAllPlants);
router.post("/", addPlant);

export default router;
