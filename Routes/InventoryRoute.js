const express = require("express");
const {
  getAllInventory,
  getOneInventory,
  createInventory,
  updateInventory,
  deleteInventory,
} = require("../Controllers/InventoryController");
const router = express.Router();

router.route("/").get(getAllInventory).post(createInventory);
router
  .route("/:id")
  .get(getOneInventory)
  .put(updateInventory)
  .delete(deleteInventory);
module.exports = router;
