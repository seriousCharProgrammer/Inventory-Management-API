const express = require("express");
const {
  checkInvStatus,
  checkInvStatusPdf,
  checkInvStatusCsv,
} = require("../Controllers/inventorystatus");
const { protect, authorize } = require("../Middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(protect, authorize("employer", "admin"), checkInvStatus);
router
  .route("/pdf")
  .get(protect, authorize("employer", "admin"), checkInvStatusPdf);
router
  .route("/csv")
  .get(protect, authorize("employer", "admin"), checkInvStatusCsv);
module.exports = router;
