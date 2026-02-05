import axios from "axios";
import Prediction from "../models/Prediction.js";
import AIS from "../models/AIS_Log.js";
import {
  calculateDistanceKm,
  avgSpeedLastHour,
  calculateAcceleration,
  headingChange,
  random
} from "../utils/predictionUtils.js";

export const predictFromAIS = async (req, res) => {
  try {
    const { ais_log_id } = req.params;

    const aisLog = await AIS.findById(ais_log_id);
    if (!aisLog) {
      return res.status(404).json({ message: "AIS log not found" });
    }

    /* Check if prediction exists */
    const existing = await Prediction.findOne({ ais_log_id });
    if (existing) {
      return res.json(existing);
    }

    /* Mock port coords (replace later) */
    const PORT_LAT = 18.9647;
    const PORT_LON = 72.8258;

    const distance_to_port_km = calculateDistanceKm(
      aisLog.coordinates.lat,
      aisLog.coordinates.lon,
      PORT_LAT,
      PORT_LON
    );

    const features = {
      distance_to_port_km,
      speed_knots: aisLog.speed_knots,
      avg_speed_last_1hr: await avgSpeedLastHour(aisLog.vessel_id),
      acceleration: await calculateAcceleration(aisLog.vessel_id),
      heading_change: await headingChange(aisLog.vessel_id),
      engine_health: random(0.75, 0.95),
      wind_speed_kmph: random(10, 30),
      wave_height_m: random(0.5, 3),
      visibility_km: random(5, 10),
      weather_severity: random(0.2, 0.7),
      current_queue: Math.floor(random(2, 8)),
      berth_capacity: 10
    };

    /* Call Flask ML model */
    const mlRes = await axios.post(
      "http://localhost:8000/predict/eta",
      { features }
    );

    const prediction = await Prediction.create({
      ais_log_id,
      vessel_id: aisLog.vessel_id,
      predicted_eta_minutes: mlRes.data.predicted_eta_minutes,
      predicted_eta_hours: mlRes.data.predicted_eta_hours,
      confidence: mlRes.data.confidence,
      features_used: features
    });

    res.status(201).json(prediction);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const predictFromAISInternal = async (ais_log_id) => {
  try {
    const aisLog = await AIS.findById(ais_log_id);
    if (!aisLog) return;

    const existing = await Prediction.findOne({ ais_log_id });
    if (existing) return;

    const PORT_LAT = 18.9647;
    const PORT_LON = 72.8258;

    const distance_to_port_km = calculateDistanceKm(
      aisLog.coordinates.lat,
      aisLog.coordinates.lon,
      PORT_LAT,
      PORT_LON
    );

    const features = {
      distance_to_port_km,
      speed_knots: aisLog.speed_knots,
      avg_speed_last_1hr: await avgSpeedLastHour(aisLog.vessel_id),
      acceleration: await calculateAcceleration(aisLog.vessel_id),
      heading_change: await headingChange(aisLog.vessel_id),
      engine_health: random(0.75, 0.95),
      wind_speed_kmph: random(10, 30),
      wave_height_m: random(0.5, 3),
      visibility_km: random(5, 10),
      weather_severity: random(0.2, 0.7),
      current_queue: Math.floor(random(2, 8)),
      berth_capacity: 10
    };

    const mlRes = await axios.post(
      "http://localhost:8000/predict/eta",
      { features }
    );

    await Prediction.create({
      ais_log_id,
      vessel_id: aisLog.vessel_id,
      predicted_eta_minutes: mlRes.data.predicted_eta_minutes,
      predicted_eta_hours: mlRes.data.predicted_eta_hours,
      confidence: mlRes.data.confidence,
      features_used: features
    });

  } catch (err) {
    console.error("Prediction internal failed:", err.message);
  }
};

export const getPredictionsByVessel = async (req, res) => {
  try {
    const { vessel_id } = req.params;

    if (!vessel_id) {
      return res.status(400).json({ message: "vessel_id required" });
    }

    // 1️⃣ Get all AIS logs
    const aisLogs = await AIS.find({ vessel_id }).sort({ timestamp: -1 });

    if (aisLogs.length === 0) {
      return res.json([]);
    }

    // 2️⃣ Ensure prediction exists for each AIS log
    for (const log of aisLogs) {
      const exists = await Prediction.findOne({ ais_log_id: log._id });
      if (!exists) {
        await predictFromAISInternal(log._id);
      }
    }

    // 3️⃣ Fetch predictions
    const predictions = await Prediction.find({
      ais_log_id: { $in: aisLogs.map(l => l._id) }
    });

    // 4️⃣ Merge AIS + Prediction
    const response = aisLogs.map(log => {
      const prediction = predictions.find(
        p => p.ais_log_id.toString() === log._id.toString()
      );

      return {
        ais_log: log,
        prediction: prediction || null
      };
    });

    res.json(response);

  } catch (err) {
    console.error("Get vessel predictions failed:", err);
    res.status(500).json({ error: err.message });
  }
};