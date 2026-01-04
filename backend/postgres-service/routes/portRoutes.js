import express from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { allowRoles } from "../middleware/allowRoles.js";
import { fetchAllPorts, addPort } from "../controllers/portController.js";

const router = express.Router();

// PORT_AUTHORITY → view all ports
router.get(
  "/",
  verifyJWT,
  allowRoles("PORT_AUTHORITY"),
  fetchAllPorts
);

// PORT_AUTHORITY → create port
router.post(
  "/",
  verifyJWT,
  allowRoles("PORT_AUTHORITY"),
  addPort
);

export default router;
