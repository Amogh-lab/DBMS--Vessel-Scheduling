import pool from "../config/postgres.js";

export const getAllPlants = async () => {
  const query = `
    SELECT
      plant_id,
      plant_name,
      raw_material_demand,
      inventory_status,
      priority_level,
      created_at
    FROM plant
    ORDER BY priority_level DESC
  `;
  const result = await pool.query(query);
  return result.rows;
};

export const createPlant = async (plant) => {
  const {
    plant_id,
    plant_name,
    raw_material_demand,
    inventory_status,
    priority_level
  } = plant;

  const query = `
    INSERT INTO plant (
      plant_id,
      plant_name,
      raw_material_demand,
      inventory_status,
      priority_level
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const values = [
    plant_id,
    plant_name,
    raw_material_demand,
    inventory_status,
    priority_level
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};
