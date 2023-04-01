const mongoose = require("mongoose");

const toJSON = require("../utils/toJSON");

const { ObjectId } = mongoose.Types;

const historySchema = mongoose.Schema({
  date: {
    type: String,
  },
  by: {
    type: ObjectId,
    ref: "InventorySupplier",
  },
  action: {
    type: String,
  },
  quantity: {
    type: {
      unit: String,
      value: Number,
    },
  },
  total: {
    type: Number,
  },
});

const inventoryStocktakeSchema = mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
    },
    minStock: {
      type: Number,
    },
    quantity: {
      value: Number,
      unit: String,
    },
    subQuantity: {
      value: Number,
      unit: String,
    },
    subSubQuantity: {
      value: Number,
      unit: String,
    },
    total: {
      type: Number,
    },
    supplier: [
      {
        type: ObjectId,
        ref: "InventorySupplier",
      },
    ],
    storage: {
      type: String,
    },
    purchased: {
      type: Number,
      default:0,
    },
    begin: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    waste: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Number,
      default:0,
    },
    orderDate: {
      type: String,
    },
    lastOrderDate: {
      type: String,
    },
    lastOrderRecieved: {
      type: String,
    },
    history: {
      type: [historySchema],
    },
  },
  {
    timestamps: true,
  }
);

toJSON(inventoryStocktakeSchema);

const InventoryStocktake = mongoose.model(
  "InventoryStocktake",
  inventoryStocktakeSchema
);

module.exports = InventoryStocktake;