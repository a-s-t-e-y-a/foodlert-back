const mongoose = require("mongoose");

const toJSON = require("../utils/toJSON");

const { ObjectId } = mongoose.Types;

const inventoryOrderSchema = mongoose.Schema(
  {
    orderedBy: {
      type: ObjectId,
      ref: "User",
    },
    recievedBy: {
      type: ObjectId,
    },
    paymentBy: {
      type: String,
    },
    notes: {
      type: String,
    },
    orderDate: {
      type: String,
    },
    deliveryDate: {
      type: String,
    },
    status: {
      type: String,
      default: "open",
    },
    itemDetails: [
      {
        item: String,
        unit: String,
        quantity: {
          unit: String,
          value: Number,
        },
        subQuantity: {
          unit: String,
          value: Number,
        },
        subSubQuantity: {
          unit: String,
          value: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

toJSON(inventoryOrderSchema);

const InventoryOrder = mongoose.model("InventoryOrder", inventoryOrderSchema);

module.exports = InventoryOrder;
