import express from "express";
import { fetchAllPorts, addPort } from "../controllers/portController.js";

const router = express.Router();

router.get("/", fetchAllPorts);
router.post("/", addPort);

export default router;