import express from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { allowRoles } from "../middleware/allowRoles.js";
import { allowOwnPlant } from "../middleware/scopeMiddleware.js";
import {
  fetchAllDeliveries,
  fetchDeliveriesByPlant,
  addDelivery
} from "../controllers/deliveryController.js";

const router = express.Router();

// PORT_AUTHORITY → view all deliveries
router.get(
  "/",
  verifyJWT,
  allowRoles("PORT_AUTHORITY"),
  fetchAllDeliveries
);

// PLANT_MANAGER → own plant deliveries
// PORT_AUTHORITY → any plant deliveries
router.get(
  "/plant/:plant_id",
  verifyJWT,
  allowRoles("PLANT_MANAGER", "PORT_AUTHORITY"),
  (req, res, next) => {
    if (req.user.role === "PLANT_MANAGER") {
      return allowOwnPlant(req, res, next);
    }
    next();
  },
  fetchDeliveriesByPlant
);

// PORT_AUTHORITY → create delivery
router.post(
  "/",
  verifyJWT,
  allowRoles("PORT_AUTHORITY"),
  addDelivery
);

export default router;
