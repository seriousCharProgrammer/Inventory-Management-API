const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const ErrorResponse = require("../utils/errorResponse");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  sendTokenResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("please  provide and email", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("wrong email or password please retry"), 401);
  }
  const ismatch = await user.matchPassword(password);
  if (!ismatch) {
    return next(new ErrorResponse("wrong email or password please retry"), 401);
  }

  sendTokenResponse(user, 200, res);
});

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: null,
  });
});

const sendTokenResponse = function (user, statuscode, res) {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXP * 60 * 1000),
    httpOnly: true,
  };
  res.status(statuscode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
