import {
  getAllDeliveries,
  getDeliveriesByPlant,
  createDelivery
} from "../models/deliveryModel.js";

export const fetchAllDeliveries = async (req, res) => {
  try {
    const deliveries = await getAllDeliveries();
    res.status(200).json(deliveries);
  } catch (error) {
    console.error("Error fetching deliveries:", error);
    res.status(500).json({ message: "Failed to fetch deliveries" });
  }
};

export const fetchDeliveriesByPlant = async (req, res) => {
  try {
    const { plant_id } = req.params;
    const deliveries = await getDeliveriesByPlant(plant_id);
    res.status(200).json(deliveries);
  } catch (error) {
    console.error("Error fetching plant deliveries:", error);
    res.status(500).json({ message: "Failed to fetch plant deliveries" });
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
