import Sensor from "../models/IoT_Sensor.js";

export const addSensorData = async (req, res) => {
    try{
        const doc = await Sensor.create(req.body);
        res.status(201).json(doc);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};

export const getSensorData = async (req, res) => {
    try{
        const data= await Sensor.find().sort({timestamp :-1});
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json({error: err.message}); 
    }
}
