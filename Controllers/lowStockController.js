const Inventory = require("../Models/InventoryModel");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");

exports.checkInv = asyncHandler(async (req, res, next) => {
  const products = await Inventory.find();
  let arr = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].quantity < products[i].threshold) {
      arr.push({
        name: products[i].name,
        sku: products[i].sku,
        quantity: products[i].quantity,
        category: products[i].category,
        threshold: products[i].threshold,
        status: "very low Stock please refill stock",
      });
    }
  }

  res.status(200).json({
    success: true,
    data: arr,
  });
});
