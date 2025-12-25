import pool from "../config/postgres.js";

export const getAllPorts = async () => {
    const query = `
        SELECT
            port_id,
            port_name,
            berth_capacity,
            current_queue,
            weather_status,
            port_efficiency_rating,
            created_at
        FROM port
        ORDER BY created_at DESC
        `;
    const result = await pool.query(query);
    return result.rows; 
};

export const createPort = async (port) => {
    const {
        port_id,
        port_name,
        berth_capacity,
        current_queue,
        weather_status,
        port_efficiency_rating
    } = port;

    const query = `
        INSERT INTO port (
            port_id,
            port_name,
            berth_capacity,
            current_queue,
            weather_status,
            port_efficiency_rating
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
    const values = [
        port_id,
        port_name,
        berth_capacity,
        current_queue,
        weather_status,
        port_efficiency_rating
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
};