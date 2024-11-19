const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const ErrorResponse = require("../utils/errorResponse");
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    data: users,
  });
});

exports.getOneUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorResponse("user dosent exist", 404));
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body);
  user.save();

  res.status(201).json({
    success: true,
    data: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorResponse("user dosent exist", 404));
  }

  user = await User.findByIdAndDelete(req.params.id);

  res.status(201).json({
    success: true,
    data: null,
  });
});
