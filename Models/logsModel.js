const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.ObjectId,
    ref: "Inventory",
    required: true,
  },
  reason: {
    type: String,
  },
  action: {
    type: String,
    enum: ["incoming", "outgoing"],
    required: [true, "A log needs an action either incoming or outgoing"],
  },
  quantity: {
    type: Number,
    required: [true, "please add quantity moved"],
  },
  date: {
    type: Date,
    default: Date(Date.now()),
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Log", logSchema);
