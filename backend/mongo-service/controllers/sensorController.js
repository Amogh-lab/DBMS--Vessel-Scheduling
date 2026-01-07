import Sensor from "../models/IoT_Sensor.js";

export const addSensorData = async (req, res) => {
  try {
    const { vessel_id } = req.body;

    // Extra safety (defensive check)
    if (req.user.role === "VESSEL_OPERATOR") {
      if (req.user.vessel_id !== vessel_id) {
        return res
          .status(403)
          .json({ message: "Access denied: Not your vessel" });
      }
    }

    const doc = await Sensor.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSensorData = async (req, res) => {
  try {
    const { vessel_id } = req.params;

    if (!vessel_id) {
      return res.status(400).json({ message: "vessel_id required" });
    }

    const data = await Sensor.find({ vessel_id })
      .sort({ timestamp: -1 });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
