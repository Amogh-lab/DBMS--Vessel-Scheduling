import pool from "../config/postgres.js";

export const getAllDeliveries = async () => {
  const query = `
    SELECT
      d.delivery_id,
      d.schedule_id,
      s.vessel_id,
      v.vessel_name,
      s.port_id,
      p.port_name,
      d.plant_id,
      pl.plant_name,
      d.delivery_eta,
      d.status,
      d.created_at
    FROM delivery d
    JOIN schedule s ON d.schedule_id = s.schedule_id
    JOIN vessel v ON s.vessel_id = v.vessel_id
    JOIN port p ON s.port_id = p.port_id
    JOIN plant pl ON d.plant_id = pl.plant_id
    ORDER BY d.created_at DESC
  `;
  const result = await pool.query(query);
  return result.rows;
};

export const getDeliveriesByPlant = async (plant_id) => {
  const query = `
    SELECT
      d.delivery_id,
      d.schedule_id,
      d.plant_id,
      d.delivery_eta,
      d.status,
      d.created_at
    FROM delivery d
    WHERE d.plant_id = $1
    ORDER BY d.created_at DESC
  `;
  const result = await pool.query(query, [plant_id]);
  return result.rows;
};

export const createDelivery = async (delivery) => {
  const {
    delivery_id,
    schedule_id,
    plant_id,
    delivery_eta,
    status
  } = delivery;

  const query = `
    INSERT INTO delivery (
      delivery_id,
      schedule_id,
      plant_id,
      delivery_eta,
      status
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
  `;

  const values = [
    delivery_id,
    schedule_id,
    plant_id,
    delivery_eta,
    status
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};
