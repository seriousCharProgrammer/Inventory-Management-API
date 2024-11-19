const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [, "A name is required fro the user"],
    trim: true,
    maxlength: [50, "name cannot be longer than 50 character"],
  },
  email: {
    type: String,
    required: [true, "A user requires an email."],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "please add a valid email"],
  },
  password: {
    type: String,
    required: [true, "A User requiresa password"],
    select: false,
  },
  role: {
    type: String,
    enum: ["employee", "employer"],
    default: "employee",
  },
});
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXP,
  });
};
UserSchema.methods.matchPassword = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};
module.exports = mongoose.model("User", UserSchema);
