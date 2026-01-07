import express from "express";
import {
  addEvent,
  getEvents,
  updateEvent
} from "../controllers/eventController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/allowRoles.js";
import { allowOwnVessel } from "../middleware/scopeMiddleware.js";

const router = express.Router();

// READ
router.get(
  "/:vessel_id",
  verifyJWT,
  allowRoles("VESSEL_OPERATOR", "PORT_AUTHORITY"),
  allowOwnVessel,
  getEvents
);

// CREATE
router.post(
  "/",
  verifyJWT,
  allowRoles("VESSEL_OPERATOR"),
  allowOwnVessel,
  addEvent
);

// UPDATE (resolve)
router.put(
  "/:event_id",
  verifyJWT,
  allowRoles("PORT_AUTHORITY"),
  updateEvent
);

export default router;
