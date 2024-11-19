const Inventory = require("../Models/InventoryModel");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");

exports.getAllInventory = asyncHandler(async (req, res, next) => {
  const products = await Inventory.find();

  res.status(200).json({
    success: true,
    data: products,
  });
});

exports.getOneInventory = asyncHandler(async (req, res, next) => {
  const product = await Inventory.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorResponse("the product dosent exists in the inventory", 404)
    );
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

exports.createInventory = asyncHandler(async (req, res, next) => {
  const product = await Inventory.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
});

exports.updateInventory = asyncHandler(async (req, res, next) => {
  let product = await Inventory.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorResponse("the product dosent exists in the inventory", 404)
    );
  }

  await Inventory.findByIdAndUpdate(req.params.id, req.body);
  await product.save();
  product = await Inventory.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: product,
  });
});

exports.deleteInventory = asyncHandler(async (req, res, next) => {
  let product = await Inventory.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorResponse("the product dosent exists in the inventory", 404)
    );
  }

  product = await Inventory.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: null,
  });
});
