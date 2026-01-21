import {
  getAllSchedules,
  createSchedule,
  getSchedulesByVessel,
  getSchedulesByPlant
} from "../models/scheduleModel.js";
import axios from "axios";

export const fetchAllSchedules = async (req, res) => {
  try {
    const schedules = await getAllSchedules();
    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res.status(500).json({ message: "Failed to fetch schedules" });
  }
};

export const fetchSchedulesByVessel = async (req, res) => {
  try {
    const { vessel_id } = req.params;
    const schedules = await getSchedulesByVessel(vessel_id);
    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error fetching vessel schedules:", error);
    res.status(500).json({ message: "Failed to fetch vessel schedules" });
  }
};

export const fetchSchedulesByPlant = async (req, res) => {
  try {
    const { plant_id } = req.params;
    const schedules = await getSchedulesByPlant(plant_id);
    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error fetching plant schedules:", error);
    res.status(500).json({ message: "Failed to fetch plant schedules" });
  }
};

export const addSchedule = async (req, res) => {
  try {
    const newSchedule = await createSchedule(req.body);
    res.status(201).json(newSchedule);
  } catch (error) {
    console.error("Error creating schedule:", error);
    res.status(500).json({ message: "Failed to create schedule" });
  }
};

export const generateIntelligentSchedule = async (req, res) => {
  try {
    const { berths_per_port } = req.query;
    const berths = berths_per_port ? parseInt(berths_per_port) : 5;

    // Call the model API to generate schedule
    const modelResponse = await axios.get(`http://localhost:8000/schedule/berths?per_port=${berths}`);
    const scheduleData = modelResponse.data;

    // Assuming the model returns schedule data that can be inserted into DB
    // For now, just return the data; in full integration, parse and insert
    res.status(200).json(scheduleData);
  } catch (error) {
    console.error("Error generating intelligent schedule:", error);
    res.status(500).json({ message: "Failed to generate intelligent schedule" });
  }
};
