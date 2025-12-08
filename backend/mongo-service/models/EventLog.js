import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  vessel_id: { type: String, required: true },
  port_id: { type: String },
  timestamp: { type: Date, default: Date.now },
  event_type: { type: String, required: true },
  severity: String,
  description: String,
  resolved: { type: Boolean, default: false }
});

export default mongoose.model("Event_Logs", eventSchema);
