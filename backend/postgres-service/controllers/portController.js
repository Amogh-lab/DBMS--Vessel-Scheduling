import { getAllPorts, createPort } from "../models/portModel.js";

export const fetchAllPorts = async (req, res) => {
  try {
    const ports = await getAllPorts();
    res.status(200).json(ports);
  } catch (error) {
    console.error("Error fetching ports:", error);
    res.status(500).json({ message: "Failed to fetch ports" });
  }
};

export const addPort = async (req, res) => {
  try {
    const newPort = await createPort(req.body);
    res.status(201).json(newPort);
  } catch (error) {
    console.error("Error creating port:", error);
    res.status(500).json({ message: "Failed to create port" });
  }
};
