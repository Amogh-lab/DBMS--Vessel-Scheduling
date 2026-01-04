export const allowOwnVessel = (req, res, next) => {
  const { vessel_id } = req.user;
  const requestedVesselId = req.params.vessel_id;

  if (!vessel_id || vessel_id !== requestedVesselId) {
    return res.status(403).json({ message: "Access denied: Not your vessel" });
  }
  next();
};

export const allowOwnPlant = (req, res, next) => {
  const { plant_id } = req.user;
  const requestedPlantId = req.params.plant_id;

  if (!plant_id || plant_id !== requestedPlantId) {
    return res.status(403).json({ message: "Access denied: Not your plant" });
  }
  next();
};