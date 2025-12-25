import mongoose from "mongoose";

const aisSchema = new mongoose.Schema({
    vessel_id: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    coordinates: {
        lat: Number,
        lon: Number
    },
    speed_knots: Number,
    heading: Number,
    status: String,
    destination: String
});

export default mongoose.model("AIS_Log", aisSchema);