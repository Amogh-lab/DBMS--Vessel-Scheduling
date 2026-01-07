import express from "express";
import {
  addSensorData,
  getSensorData
} from "../controllers/sensorController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/allowRoles.js";
import { allowOwnVessel } from "../middleware/scopeMiddleware.js";

const router = express.Router();

/*
VESSEL_OPERATOR → Read own
PORT_AUTHORITY → Read all
*/
router.get(
  "/:vessel_id",
  verifyJWT,
  allowRoles("VESSEL_OPERATOR", "PORT_AUTHORITY"),
  allowOwnVessel,
  getSensorData
);

/*
VESSEL_OPERATOR → Write own
*/
router.post(
  "/",
  verifyJWT,
  allowRoles("VESSEL_OPERATOR"),
  allowOwnVessel,
  addSensorData
);

export default router;
