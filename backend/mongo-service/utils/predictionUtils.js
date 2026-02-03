import ais from "../models/AIS_Log.js";

/* Haversine distance */
export const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

export const random = (min, max) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(2));

/* Avg speed last 1 hour */
export const avgSpeedLastHour = async (vessel_id) => {
  const logs = await ais
    .find({ vessel_id })
    .sort({ timestamp: -1 })
    .limit(6);

  if (logs.length === 0) return 0;

  const sum = logs.reduce((a, b) => a + (b.speed_knots || 0), 0);
  return sum / logs.length;
};

/* Acceleration */
export const calculateAcceleration = async (vessel_id) => {
  const logs = await ais
    .find({ vessel_id })
    .sort({ timestamp: -1 })
    .limit(2);

  if (logs.length < 2) return 0;
  return logs[0].speed_knots - logs[1].speed_knots;
};

/* Heading change */
export const headingChange = async (vessel_id) => {
  const logs = await ais
    .find({ vessel_id })
    .sort({ timestamp: -1 })
    .limit(2);

  if (logs.length < 2) return 0;
  return Math.abs(logs[0].heading - logs[1].heading);
};
