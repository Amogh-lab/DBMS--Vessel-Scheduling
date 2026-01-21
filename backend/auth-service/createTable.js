import pool from "./config/postgres.js";

(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id UUID PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        vessel_id UUID,
        plant_id UUID,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    pool.end();
  }
})();