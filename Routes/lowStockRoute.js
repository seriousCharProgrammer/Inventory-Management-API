const express = require("express");
const { checkInv } = require("../Controllers/lowStockController");
const { protect, authorize } = require("../Middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(protect, authorize("employer", "admin"), checkInv);

module.exports = router;
