const mongoose = require('mongoose');

const toJSON = require('../utils/toJSON');

const { ObjectId } = mongoose.Types;

const InventoryCart = mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  quantity: {
    type: Object
  },
  supQuantity: {
    type: Object
  },
  supsupQuantity: {
    type: Object
  },
  price: {
    type: Number
  },
  total: {
    type: Number
  }
});

const inventorySupplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    portalUrl: {
      type: String
    },
    mobileNo: {
      type: Number
    },
    phoneNo: {
      type: Number
    },
    address: {
      type: String
    },
    image: {
      type: String
    },
    orderVia: {
      type: String
    },
    minOrderValue: {
      type: Number
    },
    deliveryFee: {
      type: Number
    },
    deliveryInstructions: {
      type: String
    },
    cart: {
      type: [InventoryCart]
    },
    order: ObjectId
  },
  {
    timestamps: true
  }
);

toJSON(inventorySupplierSchema);

const InventorySupplier = mongoose.model('InventorySupplier', inventorySupplierSchema);

module.exports = InventorySupplier;
