const express = require("express");
const router = express.Router();
const controller = require("../controllers/scheduleController");

router.get("/", controller.getSchedules);

module.exports = router;
