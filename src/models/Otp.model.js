const mongoose = require('mongoose');

const toJSON = require('../utils/toJSON');

const { ObjectId } = mongoose.Types;

const OtpSchema = mongoose.Schema(
  {
    otp: {
      type: String,
      required: true
    },
    expires: {
      type: Date,
      required: true
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

toJSON(OtpSchema);

const Otp = mongoose.model('Otp', OtpSchema);

module.exports = Otp;
