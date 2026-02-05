import mongoose from "mongoose";

const PredictionSchema = new mongoose.Schema({
  ais_log_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AIS_Log",
    required: true,
    unique: true
  },

  vessel_id: {
    type: String,
    required: true
  },

  predicted_eta_minutes: Number,
  predicted_eta_hours: Number,
  confidence: Number,

  features_used: {
    distance_to_port_km: Number,
    speed_knots: Number,
    avg_speed_last_1hr: Number,
    acceleration: Number,
    heading_change: Number,
    engine_health: Number,
    wind_speed_kmph: Number,
    wave_height_m: Number,
    visibility_km: Number,
    weather_severity: Number,
    current_queue: Number,
    berth_capacity: Number
  },

  model: {
    type: String,
    default: "RandomForest"
  },

  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Prediction", PredictionSchema);
