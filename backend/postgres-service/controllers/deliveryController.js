import { getAllDeliveries, createDelivery } from "../models/deliveryModel.js";

export const fetchAllDeliveries = async (req, res) => {
  try {
    const deliveries = await getAllDeliveries();
    res.status(200).json(deliveries);
  } catch (error) {
    console.error("Error fetching deliveries:", error);
    res.status(500).json({ message: "Failed to fetch deliveries" });
  }
};

export const addDelivery = async (req, res) => {
  try {
    const newDelivery = await createDelivery(req.body);
    res.status(201).json(newDelivery);
  } catch (error) {
    console.error("Error creating delivery:", error);
    res.status(500).json({ message: "Failed to create delivery" });
  }
};
