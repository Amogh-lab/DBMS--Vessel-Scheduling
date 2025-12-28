import express from "express";
import {
  fetchAllDeliveries,
  addDelivery
} from "../controllers/deliveryController.js";

const router = express.Router();

router.get("/", fetchAllDeliveries);
router.post("/", addDelivery);

export default router;
