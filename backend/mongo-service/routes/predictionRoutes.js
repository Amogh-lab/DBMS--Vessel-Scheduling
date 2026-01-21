// Create: backend/mongo-service/routes/predictionRoutes.js
import express from "express";
import { predictVesselETA } from "../controllers/predictionController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/allowRoles.js";
import { allowOwnVessel } from "../middleware/scopeMiddleware.js";

const router = express.Router();

/*
GET /predict/:vessel_id
Predict ETA for a specific vessel using current sensor/AIS data
VESSEL_OPERATOR → Predict own vessel
PORT_AUTHORITY → Predict any vessel
*/
router.get(
  "/predict/:vessel_id",
  verifyJWT,
  allowRoles("VESSEL_OPERATOR", "PORT_AUTHORITY"),
  (req, res, next) => {
    if (req.user.role === "VESSEL_OPERATOR") {
      return allowOwnVessel(req, res, next);
    }
    next();
  },
  predictVesselETA
);

export default router;