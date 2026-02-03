import express from "express";
import { predictFromAIS } from "../controllers/predictionController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/allowRoles.js";
import { getPredictionsByVessel } from "../controllers/predictionController.js";

const router = express.Router();

/**
 * POST /api/predictions/:ais_log_id
 * Generate prediction for a given AIS log
 */
router.post(
  "/:ais_log_id",
  verifyJWT,
  allowRoles("VESSEL_OPERATOR", "PORT_AUTHORITY"),
  predictFromAIS
);

router.get(
  "/vessel/:vessel_id",
  verifyJWT,
  allowRoles("VESSEL_OPERATOR", "PORT_AUTHORITY"),
  getPredictionsByVessel
);

export default router;
