import express from "express";
import { getAISLog } from "../controllers/aisController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/allowRoles.js";
import { allowOwnVessel } from "../middleware/scopeMiddleware.js";

const router = express.Router();

/*
VESSEL_OPERATOR → Read own
PORT_AUTHORITY → Read all
PLANT_MANAGER → ❌
*/
router.get(
  "/:vessel_id",
  verifyJWT,
  allowRoles("VESSEL_OPERATOR", "PORT_AUTHORITY"),
  allowOwnVessel,
  getAISLog
);

export default router;
