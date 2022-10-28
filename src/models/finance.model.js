const mongoose = require('mongoose');

const toJSON = require('../utils/toJSON');

const { ObjectId } = mongoose.Types;

const financeSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true
    },
    costs: Object,
    time: {
      type: String
    },
    registerDate: {
      type: Date,
      default: Date.now()
    },
    registerBy: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    comment: {
      type: String
    },
    status: {
      type: String,
      default: 'pending'
    },
    method: {
      type: String
    },
    accountNo: {
      type: String
    },
    platforms: {
      type: Object,
      default: undefined
    },
    missingPOS: Number
  },
  { timestamps: true }
);

toJSON(financeSchema);

const Finance = mongoose.model('Finance', financeSchema);

module.exports = Finance;
