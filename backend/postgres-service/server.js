import express from "express";
import dotenv from "dotenv";
import pool from "./config/postgres.js";

dotenv.config();

const app=express();
app.use(express.json());

const testDb = async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("PostgreSQL connected:", result.rows[0]);
  } catch (err) {
    console.error("PostgreSQL connection failed:", err);
    process.exit(1);
  }
};

testDb();

app.listen(process.env.PORT, () => {
  console.log(`PostgreSQL service running on port ${process.env.PORT}`);
});
