import express from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { allowRoles } from "../middleware/allowRoles.js";
import { allowOwnPlant } from "../middleware/scopeMiddleware.js";
import {
  fetchAllPlants,
  fetchPlantById,
  addPlant
} from "../controllers/plantController.js";

const router = express.Router();

// PORT_AUTHORITY → view all plants
router.get(
  "/",
  verifyJWT,
  allowRoles("PORT_AUTHORITY"),
  fetchAllPlants
);

// PLANT_MANAGER → own plant
// PORT_AUTHORITY → any plant
router.get(
  "/:plant_id",
  verifyJWT,
  allowRoles("PLANT_MANAGER", "PORT_AUTHORITY"),
  (req, res, next) => {
    if (req.user.role === "PLANT_MANAGER") {
      return allowOwnPlant(req, res, next);
    }
    next();
  },
  fetchPlantById
);

// PORT_AUTHORITY → create plant
router.post(
  "/",
  verifyJWT,
  allowRoles("PORT_AUTHORITY"),
  addPlant
);

export default router;
