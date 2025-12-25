import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
    sensor_id: { type: String, required: true },
    vessel_id: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    fuel_level: Number,
    temperature: Number,
    engine_rpm: Number,
    vibration_level: Number,
    battery_voltage: Number,
    location: {
        lat: Number,
        lon: Number
  }
})

export default mongoose.model('IoT_Sensor_data', sensorSchema);