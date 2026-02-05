import pool from "../config/postgres.js";

export const resolveLocation = async (lat, lon) => {
  const point = `ST_SetSRID(ST_Point($1, $2), 4326)`;

  // 1️⃣ Check PORT first (highest priority)
  const portRes = await pool.query(
    `
    SELECT port_name
    FROM port
    WHERE geom IS NOT NULL
      AND ST_Contains(geom, ${point})
    LIMIT 1
    `,
    [lon, lat]
  );

  if (portRes.rows.length > 0) {
    return {
      type: "PORT",
      name: portRes.rows[0].port_name
    };
  }

  // 2️⃣ Check SEA
  const seaRes = await pool.query(
    `
    SELECT name
    FROM sea_regions
    WHERE ST_Contains(geom, ${point})
    LIMIT 1
    `,
    [lon, lat]
  );

  if (seaRes.rows.length > 0) {
    return {
      type: "SEA",
      name: seaRes.rows[0].name
    };
  }

  // 3️⃣ Fallback
  return {
    type: "UNKNOWN",
    name: "Open Waters"
  };
};
