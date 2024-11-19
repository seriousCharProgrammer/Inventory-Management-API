const express = require("express");
const { checkInvStatus } = require("../Controllers/inventorystatus");
const router = express.Router();

router.route("/").get(checkInvStatus);

module.exports = router;
