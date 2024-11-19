const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A inventory for a product needs a name"],
  },
  sku: {
    type: String,
    unique: true,
  },
  quantity: {
    type: Number,
    required: [true, "A inventory for a product needs a quantity"],
  },
  category: {
    type: String,
    required: [true, "A inventory for a product needs to be in category"],
  },
  supplier: {
    type: String,
    required: [true, "A inventory for a product needs a supplier name"],
  },
  price: {
    type: Number,
    required: [true, "A inventory for a product needs a price"],
  },
  threshold: {
    type: Number,
    required: [
      true,
      "A inventory for a product needs a threshold as minimum quantity ",
    ],
  },
  createdAt: {
    type: Date,
    default: Date(Date.now),
  },
  updatedAt: {
    type: Date,
    default: Date(Date.now),
  },
});

InventorySchema.pre("save", async function (next) {
  if (!this.sku) {
    try {
      // Find the latest SKU
      const lastItem = await mongoose
        .model("Inventory")
        .findOne()
        .sort({ createdAt: -1 });

      let nextNumber = 1; // Default SKU number for the first entry
      if (lastItem && lastItem.sku) {
        // Extract the numeric part of the last SKU
        const lastSkuNumber = parseInt(lastItem.sku.split("-")[1], 10);
        if (!isNaN(lastSkuNumber)) {
          nextNumber = lastSkuNumber + 1;
        }
      }

      // Assign the new sequential SKU
      this.sku = `SKU-${this.name}-${String(nextNumber).padStart(6, "0")}`; // Format: SKU-000001
    } catch (error) {
      return next(error); // Pass any errors to the next middleware
    }
  }

  next();
});

module.exports = mongoose.model("Inventory", InventorySchema);
