import {
  getAllPlants,
  createPlant,
  getPlantById
} from "../models/plantModel.js";

export const fetchAllPlants = async (req, res) => {
  try {
    const plants = await getAllPlants();
    res.status(200).json(plants);
  } catch (error) {
    console.error("Error fetching plants:", error);
    res.status(500).json({ message: "Failed to fetch plants" });
  }
};

export const fetchPlantById = async (req, res) => {
  try {
    const { plant_id } = req.params;
    const plant = await getPlantById(plant_id);

    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res.status(200).json(plant);
  } catch (error) {
    console.error("Error fetching plant:", error);
    res.status(500).json({ message: "Failed to fetch plant" });
  }
};

export const addPlant = async (req, res) => {
  try {
    const newPlant = await createPlant(req.body);
    res.status(201).json(newPlant);
  } catch (error) {
    console.error("Error creating plant:", error);
    res.status(500).json({ message: "Failed to create plant" });
  }
};
