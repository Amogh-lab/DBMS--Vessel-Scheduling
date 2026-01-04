import express from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { allowRoles } from "../middleware/allowRoles.js";
import { allowOwnVessel } from "../middleware/scopeMiddleware.js";
import {
    fetchAllVessels,
    fetchVesselById,
    addVessel
} from "../controllers/vesselController.js";

const router = express.Router();

// PORT_AUTHORITY → add vessel
router.post(
    "/",
    verifyJWT,
    allowRoles("PORT_AUTHORITY"),
    addVessel
);

// PORT_AUTHORITY → all vessels
router.get(
    "/",
    verifyJWT,
    allowRoles("PORT_AUTHORITY"),
    fetchAllVessels
);

// VESSEL_OPERATOR → own vessel
// PORT_AUTHORITY → any vessel
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
    fetchVesselById
);

export default router;
