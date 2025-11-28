const express = require("express");
const router = express.Router();
const controller = require("../controllers/portController");
router.get("/", controller.getPorts);
module.exports = router;
