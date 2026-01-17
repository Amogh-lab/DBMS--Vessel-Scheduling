import express from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { allowRoles } from "../middleware/allowRoles.js";
import { allowOwnVessel, allowOwnPlant } from "../middleware/scopeMiddleware.js";
import {
  fetchAllSchedules,
  fetchSchedulesByVessel,
  fetchSchedulesByPlant,
  addSchedule,
  generateIntelligentSchedule
} from "../controllers/scheduleController.js";

const router = express.Router();

// PORT_AUTHORITY → create schedule
router.post(
  "/",
  verifyJWT,
  allowRoles("PORT_AUTHORITY"),
  addSchedule
);

// PORT_AUTHORITY → view all schedules
router.get(
  "/",
  verifyJWT,
  allowRoles("PORT_AUTHORITY"),
  fetchAllSchedules
);

// VESSEL_OPERATOR → own vessel schedules
router.get(
  "/vessel/:vessel_id",
  verifyJWT,
  allowRoles("VESSEL_OPERATOR"),
  allowOwnVessel,
  fetchSchedulesByVessel
);

// PLANT_MANAGER → own plant schedules
router.get(
  "/plant/:plant_id",
  verifyJWT,
  allowRoles("PLANT_MANAGER"),
  allowOwnPlant,
  fetchSchedulesByPlant
);

// Generate intelligent schedule
router.get(
  "/generate",
  verifyJWT,
  allowRoles("PORT_AUTHORITY"),
  generateIntelligentSchedule
);

export default router;
