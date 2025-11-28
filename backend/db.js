const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",      // put your MySQL password
  database: "VesselSchedulingDB"
});

connection.connect(err => {
  if (err) {
    console.error("MySQL Connection Failed:", err);
  } else {
    console.log("✅ MySQL Connected Successfully");
  }
});

module.exports = connection;
