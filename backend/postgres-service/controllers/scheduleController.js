import { getAllSchedules, createSchedule } from "../models/scheduleModel.js";

export const fetchAllSchedules = async (req, res) => {
  try {
    const schedules = await getAllSchedules();
    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res.status(500).json({ message: "Failed to fetch schedules" });
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
