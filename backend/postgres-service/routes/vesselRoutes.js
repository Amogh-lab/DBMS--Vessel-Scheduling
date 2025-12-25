import express from "express";
import { fetchAllVessels, addVessel } from "../controllers/vesselController.js";

const router = express.Router();

router.get("/", fetchAllVessels);
router.post("/", addVessel);

export default router;
