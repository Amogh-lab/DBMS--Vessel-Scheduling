const db = require("../db");

exports.getSchedules = (req, res) => {
  const sql = `
    SELECT s.*, v.vessel_name, p.port_name
    FROM Schedule s
    JOIN Vessel v ON s.vessel_id = v.vessel_id
    JOIN Port p ON s.port_id = p.port_id
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
