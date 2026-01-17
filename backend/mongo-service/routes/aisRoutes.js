// import express from "express";
// import { getAISLog } from "../controllers/aisController.js";
// import { verifyJWT } from "../middleware/authMiddleware.js";
// import { allowRoles } from "../middleware/allowRoles.js";
// import { allowOwnVessel } from "../middleware/scopeMiddleware.js";

// const router = express.Router();

// /*
// VESSEL_OPERATOR → Read own
// PORT_AUTHORITY → Read all
// PLANT_MANAGER → ❌
// */
// router.get(
//   "/:vessel_id",
//   verifyJWT,
//   allowRoles("VESSEL_OPERATOR", "PORT_AUTHORITY"),
//   allowOwnVessel,
//   getAISLog
// );

// export default router;

import express from "express";
import { getAISLog, addAISLog, getLatestAISPosition } from "../controllers/aisController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/allowRoles.js";
import { allowOwnVessel } from "../middleware/scopeMiddleware.js";

const router = express.Router();

/*
GET /:vessel_id
VESSEL_OPERATOR → Read own
PORT_AUTHORITY → Read all
*/
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

/*
GET /latest/:vessel_id
Get latest position for a vessel
VESSEL_OPERATOR → Read own
PORT_AUTHORITY → Read all
*/
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

/*
POST /
Add new AIS log entry
VESSEL_OPERATOR → Create own vessel logs
PORT_AUTHORITY → Create any logs
*/
router.post(
  "/",
  verifyJWT,
  allowRoles("VESSEL_OPERATOR", "PORT_AUTHORITY"),
  (req, res, next) => {
    if (req.user.role === "VESSEL_OPERATOR") {
      return allowOwnVessel(req, res, next);
    }
    next();
  },
  addAISLog
);

export default router;