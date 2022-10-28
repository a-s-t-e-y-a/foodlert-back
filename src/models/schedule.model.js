const mongoose = require('mongoose');

const toJSON = require('../utils/toJSON');

const { ObjectId } = mongoose.Types;

const scheduleSchema = mongoose.Schema(
  {
    workingTime: [String, String],
    breakTime: { type: String },
    leaveType: {
      type: String,
      enum: ['Unpaid Leave', 'Annual leave', 'Sick Leave']
    },
    date: {
      type: Date,
      required: true
    },
    employee: {
      type: ObjectId,
      ref: 'Employee',
      required: true
    },
    inDraft: {
      type: Boolean,
      default: true
    },
    branch: {
      type: ObjectId,
      ref: 'Branch',
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
scheduleSchema.index({ date: 1, employee: 1, branch: 1 }, { unique: true });

toJSON(scheduleSchema);

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
