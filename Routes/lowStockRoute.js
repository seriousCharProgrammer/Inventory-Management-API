const express = require("express");
const { checkInv } = require("../Controllers/lowStockController");
const router = express.Router();

router.route("/").get(checkInv);

module.exports = router;
