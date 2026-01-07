export const allowOwnVessel = (req, res, next) => {
  const requestedVesselId =
    req.params.vessel_id || req.body.vessel_id;

  if (!requestedVesselId) {
    return res.status(400).json({ message: "Vessel ID required" });
  }

  if (req.user.role === "VESSEL_OPERATOR") {
    if (req.user.vessel_id !== requestedVesselId) {
      return res
        .status(403)
        .json({ message: "Access denied: Not your vessel" });
    }
  }

  next();
};
