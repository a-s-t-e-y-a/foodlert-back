const mongoose = require('mongoose');

const toJSON = require('../utils/toJSON');

const { ObjectId } = mongoose.Types;

const restaurentSchema = mongoose.Schema(
  {
    // it is same as branch name
    businessName: {
      type: String,
      required: true
    },
    owner: {
      type: ObjectId,
      ref: 'User'
    },

    // bankName: String,
    // bankAccount: String,
    // currency: String,
    // mainBranchLocation: String,
    // timeFormat: {
    //   type: String,
    //   enum: ['12 hr', '24 hr'],
    //   default: '12 hr'
    // },
    // timeZone: String,
    // departments: [String],
    // roles: [String],
    // jobTitles: [String],
    // payrollType: {
    //   type: String,
    //   enum: ['Weekly', 'Fortnightly', 'Monthly'],
    //   default: 'Weekly'
    // },
    lastPayrollId: {
      type: Number,
      default: 0
    },
    lastEmployeeId: {
      type: Number,
      default: 0
    },
    // cashAmount: {
    //   type: Number,
    //   default: 0.0
    // },
    // safeAmount: {
    //   type: Number,
    //   default: 0.0
    // },
    // closingAmount: {
    //   type: Number,
    //   default: 0.0
    // },
    // notification: {
    //   type: Object,
    //   default: {
    //     'Tasks Assign To You': ['email', 'sms'],
    //     'New Transfer In Finance': [],
    //     'Forecast Update': [],
    //     'Targets Update': [],
    //     'Any Update In Suppliers': [],
    //     'Items Received': [],
    //     'Update Availability Of Employees': []
    //   }
    // },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

toJSON(restaurentSchema);

const Restaurent = mongoose.model('Restaurent', restaurentSchema);

module.exports = Restaurent;
