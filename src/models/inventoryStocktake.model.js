const mongoose = require('mongoose');

const toJSON = require('../utils/toJSON');

const { ObjectId } = mongoose.Types;

const historySchema = mongoose.Schema({
  date: {
    type: String
  },
  by: {
    type: String
  },
  action: {
    type: String
  },
  quantity: {
    type: Number
  },
  total: {
    type: Number
  }
});

const inventoryStocktakeSchema = mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true
    },
    price: {
      type: Number
    },
    minStock: {
      type: Number
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
    total: {
      type: Number
    },
    supplier: {
      type: String
    },
    storage: {
      type: String
    },
    purchased: {
      type: Number
    },
    begin: {
      type: Number
    },
    sold: {
      type: Number
    },
    waste: {
      type: Number
    },
    stock: {
      type: Number
    },
    inStock: {
      type: Number
    },
    orderDate: {
      type: String
    },
    lastOrderDate: {
      type: String
    },
    lastOrderRecieved: {
      type: String
    },
    history: {
      type: [historySchema]
    }
  },
  {
    timestamps: true
  }
);

toJSON(inventoryStocktakeSchema);

const InventoryStocktake = mongoose.model('InventoryStocktake', inventoryStocktakeSchema);

module.exports = InventoryStocktake;
