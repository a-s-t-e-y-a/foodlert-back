const mongoose = require('mongoose');

const toJSON = require('../utils/toJSON');

const { ObjectId } = mongoose.Types;

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    dob: Date,
    // gender: {
    //   type: String,
    //   enum: ['Male', 'Female', 'Others']
    // },
    phoneNumber: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      enum: ['owner', 'employee', 'manager'] // manager means branch manager
    },
    pin: {
      type: Number
    },
    avatar: {
      type: String,
      default: ''
    },
    password: {
      type: String
    },
    ip: String,
    mac: String,
    branch: {
      type: ObjectId,
      ref: 'Branch'
    },
    restaurent: {
      type: ObjectId,
      ref: 'Restaurent'
    }
  },
  { timestamps: true }
);

toJSON(userSchema, 'password');

const User = mongoose.model('User', userSchema);

module.exports = User;
