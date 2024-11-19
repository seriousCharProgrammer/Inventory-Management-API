const Inventory = require("../Models/InventoryModel");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");
const Log = require("../Models/logsModel");

exports.getAllLogs = asyncHandler(async (req, res, next) => {
  const logs = await Log.find();

  res.status(200).json({
    success: true,
    logs: logs,
  });
});

exports.getOneLog = asyncHandler(async (req, res, next) => {
  const log = await Log.findById(req.params.id);
  let product = await Inventory.findById(log.itemId);
  res.status(200).json({
    success: true,
    log: log,
    item: product,
  });
});

exports.createLog = asyncHandler(async (req, res, next) => {
  const logs = await Log.create(req.body);
  let product = await Inventory.findById(req.body.itemId);
  if (!product) {
    return next(new ErrorResponse("product dosen't exist", 404));
  }

  if (req.body.action === "incoming") {
    product.quantity = product.quantity + req.body.quantity;
    product.save();
  } else if (req.body.action === "outgoing") {
    product.quantity = product.quantity - req.body.quantity;
    product.save();
  }

  res.status(200).json({
    success: true,
    log: logs,
    item: product,
  });
});
