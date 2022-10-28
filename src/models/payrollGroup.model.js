const mongoose = require('mongoose');

const toJSON = require('../utils/toJSON');

const { ObjectId } = mongoose.Types;

const payrollGroupSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    hourly: {
      type: Number,
      required: true
    },
    weekday: {
      type: Number,
      required: true
    },
    holiday: {
      type: Number,
      required: true
    },
    saturday: {
      type: Number,
      required: true
    },
    sunday: {
      type: Number,
      required: true
    },
    restaurent: {
      type: ObjectId,
      ref: 'Restaurent',
      required: true
    }
  },
  { timestamps: true }
);

payrollGroupSchema.index({ name: 1, restaurent: 1 }, { unique: true });

toJSON(payrollGroupSchema);

const PayrollGroup = mongoose.model('PayrollGroup', payrollGroupSchema);

module.exports = PayrollGroup;
