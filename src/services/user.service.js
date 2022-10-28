const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
require('express-async-errors');

const ApiError = require('../utils/ApiError');
const User = require('../models/user.model');

const createUser = async (fullName, phoneNumber, email, password, type) => {
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    throw new ApiError(httpStatus.BAD_REQUEST, `${email} is already registered with other venue!`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ fullName, phoneNumber, email, password: hashedPassword, type });
  return user;
};

const getUserById = async (userId) => {
  // const user = await User.findById(userId).populate({ path: 'branch', select: ['name', 'manager', 'isMainBranch'] });
  const user = await User.findById(userId).populate('branch');
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No restaurent found.');
  }
  return user;
};

const updateUser = async (userId, updateBody) => {
  const user = await User.findByIdAndUpdate(userId, { ...updateBody }, { new: true });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User is invalid');
  }
  return user;
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndUpdate(userId, { deleted: true });
  return user;
};

module.exports = {
  createUser,
  updateUser,
  getUserById,
  deleteUser
};
