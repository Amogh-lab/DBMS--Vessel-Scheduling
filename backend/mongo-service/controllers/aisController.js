// import ais from "../models/AIS_Log.js";

// export const addAISLog = async(req, res) => {
//     try{
//         const log = await ais.create(req.body);
//         res.status(201).json(log);
//     }
//     catch(err){
//         res.status(500).json({error: err.message});
//     }
// };

// export const getAISLog = async(req, res) => {
//     try{
//         const data = await ais.find({vessel_id: req.params.id}).sort({timestamp : -1});
//         res.json(data);
//     }
//     catch(err){
//         res.status(500).json({error: err.message});
//     }
// }

import ais from "../models/AIS_Log.js";
import axios from "axios";
import { resolveLocation } from "../services/locationResolver.js";
import { updateVesselLocation } from "../models/vesselPGModel.js";
import { predictFromAISInternal } from "./predictionController.js";

export const addAISLog = async (req, res) => {
  try {
    const log = await ais.create(req.body);

    const { vessel_id, coordinates } = log;
    const latitude = coordinates?.lat;
    const longitude = coordinates?.lon;

    if (latitude == null || longitude == null || !vessel_id) {
      return res.status(400).json({
        message: "AIS log must contain vessel_id and coordinates.lat/lon"
      });
    }

    // 🔍 Resolve location
    const location = await resolveLocation(latitude, longitude);

    // 🗂 Store in AIS history (Mongo)
    log.current_location = location.name;
    log.location_type = location.type;
    await log.save();

    // 🔥 Update authoritative vessel state (Postgres)
    await updateVesselLocation(
      vessel_id,
      location.name,
      location.type
    );

    // optional prediction hook
    predictFromAISInternal(log._id);

    res.status(201).json(log);
  } catch (err) {
    console.error("AIS ingestion error:", err);
    res.status(500).json({ error: err.message });
  }
};


// GET AIS Log by vessel_id
export const getAISLog = async(req, res) => {
    try {
        const { vessel_id } = req.params;
        
        if (!vessel_id) {
            return res.status(400).json({ message: "vessel_id required" });
        }
        
        const data = await ais.find({vessel_id: vessel_id}).sort({timestamp : -1});
        res.json(data);
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
}

// GET Latest AIS position for vessel
export const getLatestAISPosition = async(req, res) => {
    try {
        const { vessel_id } = req.params;
        
        if (!vessel_id) {
            return res.status(400).json({ message: "vessel_id required" });
        }
        
        const latestPosition = await ais.findOne({vessel_id: vessel_id})
            .sort({timestamp: -1})
            .limit(1);
        
        if (!latestPosition) {
            return res.status(404).json({ message: "No AIS data found for this vessel" });
        }
        
        res.json(latestPosition);
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
}