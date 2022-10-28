const mongoose = require('mongoose');

const toJSON = require('../utils/toJSON');

const { ObjectId } = mongoose.Types;

const inventoryOrderSchema = mongoose.Schema(
  {
    orderedBy: {
      type: ObjectId
    },
    recievedBy: {
      type: ObjectId
    },
    paymentBy: {
      type: String
    },
    notes: {
      type: String
    },
    orderDate: {
      type: String
    },
    deliveryDate: {
      type: String
    },
    status: {
      type: String,
      default: 'open'
    },
    itemDetails: {
      type: Object
    }
  },
  {
    timestamps: true
  }
);

toJSON(inventoryOrderSchema);

const InventoryOrder = mongoose.model('InventoryOrder', inventoryOrderSchema);

module.exports = InventoryOrder;
