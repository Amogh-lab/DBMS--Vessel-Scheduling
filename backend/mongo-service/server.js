import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectMongodb } from "./config/mongo.js";

import sensorRoutes from "./routes/sensorRoutes.js";
import aisRoutes from "./routes/aisRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";

dotenv.config();
connectMongodb();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/sensors", sensorRoutes);
app.use("/api/ais", aisRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/predictions", predictionRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "MongoDB Operational Data Service",
    port: process.env.PORT,
    timestamp: new Date(),
    endpoints: {
      ais: "/api/ais",
      sensors: "/api/sensors",
      events: "/api/events",
      weather: "/api/weather",
      predictions: "/api/predictions"
    },
    connections: {
      mongodb: "connected",
      ml_model: "http://localhost:8000"
    }
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "MongoDB Operational Data Service",
    version: "1.0.0",
    endpoints: [
      "GET  /api/ais/:vessel_id - Get AIS logs",
      "POST /api/ais - Add AIS log",
      "GET  /api/sensors/:vessel_id - Get sensor data",
      "POST /api/sensors - Add sensor data",
      "GET  /api/events/:vessel_id - Get events",
      "POST /api/events - Add event",
      "PUT  /api/events/:event_id - Update event",
      "GET  /api/weather - Get weather data",
      "POST /api/weather - Add weather data",
      "GET  /api/predictions/predict/:vessel_id - Get ETA prediction",
      "GET  /api/health - Health check"
    ]
  });
});

app.listen(process.env.PORT, () => {
  console.log(`✅ MongoDB service running on port ${process.env.PORT}`);
  console.log(`📊 Available endpoints:`);
  console.log(`   - AIS Logs: /api/ais`);
  console.log(`   - Sensors: /api/sensors`);
  console.log(`   - Events: /api/events`);
  console.log(`   - Weather: /api/weather`);
  console.log(`   - ML Predictions: /api/predictions`);
});