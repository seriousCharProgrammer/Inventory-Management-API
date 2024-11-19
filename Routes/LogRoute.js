const express = require("express");
const {
  getAllLogs,
  getOneLog,
  createLog,
} = require("../Controllers/LogControler");
const { protect, authorize } = require("../Middlewares/authMiddleware");
const router = express.Router();

router
  .route("/")
  .get(protect, authorize("employer", "admin"), getAllLogs)
  .post(protect, authorize("employer", "admin"), createLog);
router.route("/:id").get(protect, authorize("employer", "admin"), getOneLog);

module.exports = router;
