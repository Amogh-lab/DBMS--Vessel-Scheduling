import pool from "../config/postgres.js";

export const getAllVessels = async () => {
    const query = `
        SELECT
            vessel_id,
            vessel_name,
            vessel_type,
            capacity,
            current_location,
            fuel_status,
            created_at
        FROM vessel
        ORDER BY created_at DESC
        `;
    const result = await pool.query(query);
    return result.rows;
};

export const createVessel = async (vessel) => {
    const {
        vessel_id,
        vessel_name,
        vessel_type,
        capacity,
        current_location,
        fuel_status
    } = vessel;
    const query = `
        INSERT INTO vessel (
            vessel_id,
            vessel_name,
            vessel_type,
            capacity,
            current_location,
            fuel_status
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
    const values = [
        vessel_id,
        vessel_name,
        vessel_type,
        capacity,
        current_location,
        fuel_status
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
};