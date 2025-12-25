import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URI,
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool;