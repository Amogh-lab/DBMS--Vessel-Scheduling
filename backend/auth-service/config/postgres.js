// import pkg from "pg";
// import dotenv from "dotenv";

// dotenv.config();
// const { Pool } = pkg;

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URI
// });

// export default pool;


// changes2

// import pkg from "pg";
// import dotenv from "dotenv";

// dotenv.config();
// const { Pool } = pkg;

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URI,
//   ssl: { rejectUnauthorized: false } // required for NeonDB
// });

// export default pool;

import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
  ssl: { rejectUnauthorized: false },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});

export default pool;
