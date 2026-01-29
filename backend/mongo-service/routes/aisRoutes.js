
import express from "express";
import { getAISLog, addAISLog, getLatestAISPosition } from "../controllers/aisController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/allowRoles.js";
import { allowOwnVessel } from "../middleware/scopeMiddleware.js";

const router = express.Router();

// GET /:vessel_id - Get all AIS logs for vessel
router.get(
  "/:vessel_id",
  verifyJWT,
  allowRoles("VESSEL_OPERATOR", "PORT_AUTHORITY"),
  (req, res, next) => {
    if (req.user.role === "VESSEL_OPERATOR") {
      return allowOwnVessel(req, res, next);
    }
    next();
  },
  getAISLog
);

// GET /latest/:vessel_id - Get latest AIS position
router.get(
  "/latest/:vessel_id",
  verifyJWT,
  allowRoles("VESSEL_OPERATOR", "PORT_AUTHORITY"),
  (req, res, next) => {
    if (req.user.role === "VESSEL_OPERATOR") {
      return allowOwnVessel(req, res, next);
    }
    next();
  },
  getLatestAISPosition
);

// POST / - Add new AIS log
router.post(
  "/",
  verifyJWT,
  allowRoles("VESSEL_OPERATOR", "PORT_AUTHORITY"),
  addAISLog
);

export default router;