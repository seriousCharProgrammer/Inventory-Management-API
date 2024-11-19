const express = require("express");
const {
  getAllLogs,
  getOneLog,
  createLog,
} = require("../Controllers/LogControler");
const router = express.Router();

router.route("/").get(getAllLogs).post(createLog);
router.route("/:id").get(getOneLog).put().delete();
module.exports = router;
