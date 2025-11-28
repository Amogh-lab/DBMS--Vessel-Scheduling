// const express = require("express");
// const mysql = require("mysql2");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "ahibhruth@123",
//   database: "VesselSchedulingDB"
// });

// // --- Dashboard Stats ---
// app.get("/dashboard/stats", (req, res) => {
//   const queries = {
//     vessels: "SELECT COUNT(*) AS total FROM Vessel",
//     ports: "SELECT COUNT(*) AS total FROM Port",
//     schedules: "SELECT COUNT(*) AS total FROM Schedule"
//   };

//   let result = {};

//   db.query(queries.vessels, (err, v) => {
//     result.vessels = v[0].total;

//     db.query(queries.ports, (err, p) => {
//       result.ports = p[0].total;

//       db.query(queries.schedules, (err, s) => {
//         result.schedules = s[0].total;
//         res.json(result);
//       });
//     });
//   });
// });

// // --- Ports Data ---
// app.get("/ports", (req, res) => {
//   const sql = `
//     SELECT port_name, berth_capacity, current_occupied_berths,
//     (berth_capacity - current_occupied_berths) AS available
//     FROM Port WHERE port_status='Active'
//   `;
//   db.query(sql, (err, results) => res.json(results));
// });

// // --- Vessel Type Chart ---
// app.get("/vessels/types", (req, res) => {
//   const sql = "SELECT vessel_type, COUNT(*) as count FROM Vessel GROUP BY vessel_type";
//   db.query(sql, (err, results) => res.json(results));
// });

// // --- Fetch Vessels ---
// app.get("/vessels", (req, res) => {
//   const sql = `SELECT vessel_id, vessel_name, vessel_type, capacity_tons, flag_country FROM Vessel`;
//   db.query(sql, (err, results) => res.json(results));
// });

// // --- Add Vessel ---
// app.post("/vessels", (req, res) => {
//   const { name, type, capacity, flag } = req.body;

//   const sql = `
//   INSERT INTO Vessel (vessel_name, vessel_type, capacity_tons, current_status, flag_country)
//   VALUES (?, ?, ?, 'At Sea', ?)
//   `;

//   db.query(sql, [name, type, capacity, flag], (err, result) => {
//     if (err) throw err;
//     res.json({ message: "Vessel added" });
//   });
// });

// // --- Delete Vessel ---
// app.delete("/vessels/:id", (req, res) => {
//   const sql = "DELETE FROM Vessel WHERE vessel_id=?";
//   db.query(sql, [req.params.id], () => res.json({ message: "Deleted" }));
// });

// // --- Schedules List ---
// app.get("/schedules", (req, res) => {
//   const sql = `
//   SELECT s.schedule_id, v.vessel_name, p.port_name,
//   s.arrival_time, s.departure_time, s.schedule_status
//   FROM Schedule s
//   JOIN Vessel v ON s.vessel_id = v.vessel_id
//   JOIN Port p ON s.port_id = p.port_id
//   `;
//   db.query(sql, (err, results) => res.json(results));
// });

// app.listen(5000, () => console.log("Backend running at http://localhost:5000"));
