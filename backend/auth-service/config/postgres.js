import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
    ssl: { rejectUnauthorized: false },
    family: 4
});

export default pool;
