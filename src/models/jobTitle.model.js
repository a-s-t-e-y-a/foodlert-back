const mongoose = require('mongoose');

const toJSON = require('../utils/toJSON');

const { ObjectId } = mongoose.Types;

const jobTitleSchema = mongoose.Schema(
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
jobTitleSchema.index({ name: 1, branch: 1 }, { unique: true });

toJSON(jobTitleSchema);

const JobTitle = mongoose.model('JobTitle', jobTitleSchema);

module.exports = JobTitle;
