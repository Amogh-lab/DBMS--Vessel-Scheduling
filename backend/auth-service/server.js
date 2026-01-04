// import express from "express";
// import dotenv from "dotenv";
// import authRoutes from "./routes/authRoutes.js";

// dotenv.config();

// const app = express();
// app.use(express.json());

// app.use("/api/auth", authRoutes);

// app.listen(process.env.PORT, () => {
//   console.log(`Auth service running on port ${process.env.PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors()); // IMPORTANT for React frontend
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Auth service running on port ${process.env.PORT}`);
});

