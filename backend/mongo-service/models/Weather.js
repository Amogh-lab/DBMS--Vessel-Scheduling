import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
  port_id: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  wind_speed: Number,
  wind_direction: String,
  wave_height: Number,
  tide_level: String,
  humidity: Number,
  temperature: Number,
  visibility: String,
  rainfall_mm: Number
});

export default mongoose.model("Weather_Data", weatherSchema);
