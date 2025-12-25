import weather from "../models/Weather.js";

export const addWeatherData = async(req, res) => {
    try{
        const doc = await weather.create(req.body);
        res.status(201).json(doc);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}
export const getWeatherData = async(req, res) => {
    try{
        const data = await weather.find().sort({timestamp : -1});
        res.json(data);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}