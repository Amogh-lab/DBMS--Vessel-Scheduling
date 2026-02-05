import pool from "../config/postgres.js";

export const updateVesselLocation = async (
  vessel_id,
  location,
  location_type
) => {
  await pool.query(
    `
    UPDATE vessel
    SET current_location = $1,
        location_type = $2,
        last_updated = NOW()
    WHERE vessel_id = $3
    `,
    [location, location_type, vessel_id]
  );
};
