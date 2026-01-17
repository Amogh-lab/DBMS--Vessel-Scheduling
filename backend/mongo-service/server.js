import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import { connectMongodb } from "./config/mongo.js"

import sensorRoutes from "./routes/sensorRoutes.js"
import aisRoutes from "./routes/aisRoutes.js"
import eventRoutes from "./routes/eventRoutes.js"
import weatherRoutes from "./routes/weatherRoutes.js"

dotenv.config() 
connectMongodb()

const app = express()

app.use(cors());    
app.use(express.json());

app.use("/api/sensors", sensorRoutes)
app.use("/api/ais", aisRoutes)
app.use("/api/events", eventRoutes)
app.use("/api/weather", weatherRoutes)

app.use("/api/predictions", predictionRoutes)
// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "MongoDB Service",
    port: process.env.PORT,
    timestamp: new Date(),
    connections: {
      mongodb: "connected",
      ml_model: "http://localhost:8000"
    }
  });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
    console.log(`ML Model integration available at /api/predictions`)
});

