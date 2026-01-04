import {
  getAllSchedules,
  createSchedule,
  getSchedulesByVessel,
  getSchedulesByPlant
} from "../models/scheduleModel.js";

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
