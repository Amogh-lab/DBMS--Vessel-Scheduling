const db = require("../db");

exports.getAllVessels = (req, res) => {
  db.query("SELECT * FROM Vessel", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.addVessel = (req, res) => {
  const data = req.body;
  const sql = "INSERT INTO Vessel SET ?";
  db.query(sql, data, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Vessel Added" });
  });
};

exports.deleteVessel = (req, res) => {
  db.query("DELETE FROM Vessel WHERE vessel_id = ?", [req.params.id],
   (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
   });
};
