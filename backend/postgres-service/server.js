import express from "express";
import dotenv from "dotenv";
import pool from "./config/postgres.js";
import vesselRoutes from "./routes/vesselRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// DB test on startup
const testDb = async () => {
  const res = await pool.query("SELECT NOW()");
  console.log("PostgreSQL connected:", res.rows[0]);
};
testDb();

app.use("/api/vessels", vesselRoutes);

app.listen(process.env.PORT, () => {
  console.log(`PostgreSQL service running on port ${process.env.PORT}`);
});
