const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const vesselRoutes = require("./routes/vesselRoutes");
const portRoutes = require("./routes/portRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/vessels", vesselRoutes);
app.use("/api/ports", portRoutes);
app.use("/api/schedules", scheduleRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log("🚢 Backend running on port 5000");
});
