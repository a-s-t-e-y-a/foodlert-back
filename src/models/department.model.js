const mongoose = require('mongoose');

const toJSON = require('../utils/toJSON');

const { ObjectId } = mongoose.Types;

const departmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    branch: {
      type: ObjectId,
      ref: 'branch',
      required: true
    }
  },
  { timestamps: true }
);

departmentSchema.index({ name: 1, branch: 1 }, { unique: true });

toJSON(departmentSchema);

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
