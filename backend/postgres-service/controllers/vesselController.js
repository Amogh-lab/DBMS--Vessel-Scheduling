import {getAllVessels, createVessel, getVesselById} from '../models/vesselModel.js';

export const fetchAllVessels = async (req, res) => {
    try{
        const vessels = await getAllVessels();
        res.status(200).json(vessels);
    }
    catch(err){
        console.error("Error fetching vessels:", err);
        res.status(500).json({message: "Error fetching vessels"});
    }
};

export const addVessel = async (req, res) => {
    try{
        const newVessel = await createVessel(req.body);
        res.status(201).json(newVessel);
    }
    catch(err){
        console.error("Error adding vessel:", err);
        res.status(500).json({message: "Error adding vessel", error: err.message,
            detail: err.detail
        });
    }
};

export const fetchVesselById = async (req, res) => {
    try {
        const { vessel_id } = req.params;

        const vessel = await getVesselById(vessel_id);

        if (!vessel) {
            return res.status(404).json({ message: "Vessel not found" });
        }

        res.status(200).json(vessel);
    } catch (err) {
        console.error("Error fetching vessel:", err);
        res.status(500).json({ message: "Error fetching vessel" });
    }
};

