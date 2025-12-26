import pool from "../config/postgres.js";

export const getAllSchedules = async() => {
    const query = `
        SELECT
            s.schedule_id,
            s.vessel_id,
            s.port_id,
            p.port_name,
            s.planned_eta,
            s.predicted_eta,
            s.actual_arrival_time,
            s.departure_time,
            s.loading_unloading_duration,
            s.status,
            s.created_at
        FROM schedule s
        JOIN vessel v ON s.vessel_id = v.vessel_id
        JOIN port p ON s.port_id = p.port_id
        ORDER BY s.planned_eta ASC
        `;
    const result = await pool.query(query);
    return result.rows;           
};

export const createSchedule = async(schedule) =>{
    const {
        schedule_id,
        vessel_id,
        port_id,
        planned_eta,
        predicted_eta,
        departure_time,
        loading_unloading_duration,
        status
    } = schedule;

    const query = `
        INSERT INTO schedule (
            schedule_id,
            vessel_id,
            port_id,
            planned_eta,
            predicted_eta,
            departure_time,
            loading_unloading_duration,
            status
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
    const values = [
        schedule_id,
        vessel_id,
        port_id,
        planned_eta,
        predicted_eta,
        departure_time,
        loading_unloading_duration,
        status
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
};