const express = require("express");
const router = express.Router();
const controller = require("../controllers/vesselController");

router.get("/", controller.getAllVessels);
router.post("/", controller.addVessel);
router.delete("/:id", controller.deleteVessel);

module.exports = router;
