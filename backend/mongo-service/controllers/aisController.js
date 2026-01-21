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

// ADD AIS Log
export const addAISLog = async(req, res) => {
    try {
        const log = await ais.create(req.body);
        res.status(201).json(log);
    }
    catch(err) {
        res.status(500).json({error: err.message});
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