import express from "express";
import { addWeatherData, getWeatherData } from "../controllers/weatherController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/allowRoles.js";

const router = express.Router();

router.post(
    "/", 
    verifyJWT,
    allowRoles("PORT_AUTHORITY"),
    addWeatherData
);

router.get(
  "/",
  verifyJWT,
  allowRoles("VESSEL_OPERATOR", "PORT_AUTHORITY", "PLANT_MANAGER"),
  getWeatherData
);

export default router;
