const db = require("../db");

exports.getPorts = (req, res) => {
  db.query("SELECT * FROM Port", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
