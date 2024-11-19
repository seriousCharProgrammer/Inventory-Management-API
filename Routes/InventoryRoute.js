const express = require("express");
const {
  getAllInventory,
  getOneInventory,
  createInventory,
  updateInventory,
  deleteInventory,
} = require("../Controllers/InventoryController");
const { protect, authorize } = require("../Middlewares/authMiddleware");
const router = express.Router();

router
  .route("/")
  .get(protect, authorize("employee", "employer", "admin"), getAllInventory)
  .post(protect, authorize("employer", "admin"), createInventory);
router
  .route("/:id")
  .get(protect, authorize("employee", "employer", "admin"), getOneInventory)
  .put(protect, authorize("employer", "admin"), updateInventory)
  .delete(protect, authorize("employer", "admin"), deleteInventory);
module.exports = router;
