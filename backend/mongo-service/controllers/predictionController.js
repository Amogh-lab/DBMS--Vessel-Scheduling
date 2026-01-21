// Add to MongoDB service: controllers/predictionController.js
import axios from 'axios';
import Sensor from '../models/IoT_Sensor.js';
import AIS from '../models/AIS_Log.js';

// Predict ETA using current sensor and AIS data
export const predictVesselETA = async (req, res) => {
  try {
    const { vessel_id } = req.params;

    // Get latest sensor data
    const latestSensor = await Sensor.findOne({ vessel_id })
      .sort({ timestamp: -1 })
      .limit(1);

    // Get latest AIS data
    const latestAIS = await AIS.findOne({ vessel_id })
      .sort({ timestamp: -1 })
      .limit(1);

    if (!latestSensor || !latestAIS) {
      return res.status(404).json({ 
        message: "Insufficient data for prediction" 
      });
    }

    // Prepare features for ML model
    const features = {
      distance_to_port_km: calculateDistance(latestAIS.coordinates), // You'll need to implement this
      speed_knots: latestAIS.speed_knots || 0,
      avg_speed_last_1hr: latestAIS.speed_knots || 0,
      acceleration: 0, // Calculate from historical data
      heading_change: 0,
      engine_health: latestSensor.engine_rpm ? (latestSensor.engine_rpm / 3000) : 0.8,
      wind_speed_kmph: 20, // Get from weather service
      wave_height_m: 2,
      visibility_km: 8,
      weather_severity: 0.3,
      current_queue: 5, // Get from port service
      berth_capacity: 10
    };

    // Call ML model prediction endpoint
    const mlResponse = await axios.post('http://localhost:8000/predict/eta', {
      features: features
    });

    res.json({
      vessel_id,
      predicted_eta_minutes: mlResponse.data.predicted_eta,
      confidence: mlResponse.data.confidence,
      timestamp: new Date(),
      data_sources: {
        ais: latestAIS._id,
        sensor: latestSensor._id
      }
    });

  } catch (err) {
    console.error('ETA Prediction error:', err);
    res.status(500).json({ 
      error: err.message,
      details: 'Failed to predict ETA. Ensure ML model service is running.'
    });
  }
};

// Helper function to calculate distance
function calculateDistance(coordinates) {
  // Simplified - you'd implement proper distance calculation
  // using destination port coordinates
  return 500; // placeholder
}