import express from "express";
import dotenv from "dotenv";
import pool from "./config/postgres.js";

import vesselRoutes from "./routes/vesselRoutes.js";
import portRoutes from "./routes/portRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import plantRoutes from "./routes/plantRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// DB test on startup
// const testDb = async () => {
//   const res = await pool.query("SELECT NOW()");
//   console.log("PostgreSQL connected:", res.rows[0]);
// };
// testDb();

app.use("/api/vessels", vesselRoutes);
app.use("/api/ports", portRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/deliveries", deliveryRoutes);

app.listen(process.env.PORT, () => {
  console.log(`PostgreSQL service running on port ${process.env.PORT}`);
});
