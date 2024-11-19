const Inventory = require("../Models/InventoryModel");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");

exports.checkInvStatus = asyncHandler(async (req, res, next) => {
  const products = await Inventory.find();
  const inventoryStatus = products.map((item) => ({
    name: item.name,
    sku: item.sku,
    quantity: item.quantity,
    category: item.category,
    threshold: item.threshold,
    status: item.quantity < item.threshold ? "Low Stock" : "In Stock",
  }));

  res.status(200).json({
    success: true,
    data: inventoryStatus,
  });
});
