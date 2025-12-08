import ais from "../models/AIS_Log.js";

export const addAISLog = async(req, res) => {
    try{
        const log = await ais.create(req.body);
        res.status(201).json(log);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};

export const getAISLog = async(req, res) => {
    try{
        const data = await ais.find({vessel_id: req.params.id}).sort({timestamp : -1});
        res.json(data);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}