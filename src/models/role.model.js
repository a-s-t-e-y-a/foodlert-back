const mongoose = require('mongoose');

const toJSON = require('../utils/toJSON');

const { ObjectId } = mongoose.Types;

const roleSchema = mongoose.Schema(
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

roleSchema.index({ name: 1, branch: 1 }, { unique: true });

toJSON(roleSchema);

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
