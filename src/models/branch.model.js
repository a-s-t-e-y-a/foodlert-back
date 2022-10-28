const mongoose = require('mongoose');

const toJSON = require('../utils/toJSON');

const { ObjectId } = mongoose.Types;

const branchSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    manager: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    isMainBranch: Boolean,
    address: String,
    bankName: String,
    bankAccount: String,
    currency: String,
    timeFormat: {
      type: String,
      enum: ['12 hr', '24 hr'],
      default: '12 hr'
    },
    timeZone: String,
    payrollType: {
      type: String,
      enum: ['Weekly', 'Fortnightly', 'Monthly'],
      default: 'Weekly'
    },
    cashAmount: {
      type: Number,
      default: 0.0
    },
    safeAmount: {
      type: Number,
      default: 0.0
    },
    closingAmount: {
      type: Number,
      default: 0.0
    },
    notification: {
      type: Object,
      default: {
        'Tasks Assign To You': ['email', 'sms'],
        'New Transfer In Finance': [],
        'Forecast Update': [],
        'Targets Update': [],
        'Any Update In Suppliers': [],
        'Items Received': [],
        'Update Availability Of Employees': []
      }
    },
    restaurent: {
      type: ObjectId,
      ref: 'Restaurent',
      required: true
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

branchSchema.index({ name: 1, restaurent: 1 }, { unique: true });

toJSON(branchSchema);

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
