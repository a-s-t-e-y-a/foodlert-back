const mongoose = require('mongoose');

const toJSON = require('../utils/toJSON');

const { ObjectId } = mongoose.Types;

const manualSchema = mongoose.Schema({
  amount: {
    type: Number
  },
  meaursement: {
    type: String
  },
  ingredients: {
    type: String
  },
  image: {
    type: String
  },
  directions: {
    type: String
  }
});

const rawMaterialSchema = mongoose.Schema({
  item: {
    type: String
  },
  unit: {
    type: String
  },
  quantity: {
    type: Number
  },
  total: {
    type: Number
  }
});

const itemDetailsSchema = mongoose.Schema({
  nutriScore: { type: String },
  delivarable: { type: Boolean },
  tag: [String]
});

const menuItemSchema = mongoose.Schema(
  {
    item: {
      type: String,
      required: true
    },
    category: {
      type: String
    },
    season: {
      type: String
    },
    sellingPrice: {
      type: Number
    },
    preparingTime: {
      type: String
    },
    totalSold: {
      type: Number
    },
    manual: {
      type: [manualSchema]
    },
    rawMaterial: {
      type: [rawMaterialSchema]
    },
    itemDetails: itemDetailsSchema
  },
  {
    timestamps: true
  }
);

toJSON(menuItemSchema);

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
