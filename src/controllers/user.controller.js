const httpStatus = require('http-status');
require('express-async-errors');

const bcrypt = require('bcryptjs');

const userValidation = require('../validations/user.validation');

const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const { deleteFile } = require('../utils/deleteFile');

const updateUser = async (req, res, next) => {
  const { userId } = req.params;

  // console.log(req.files);
  let avatar;

  console.log(req.files);

  req.files?.forEach((file) => {
    if (file.fieldname === 'avatar') {
      avatar = file.filename;
      return;
    }
  });
  console.log(req.user);
  if (userId !== req.user.id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are not allowed to change!');
  }

  const { email, dob, fullName, phoneNumber, password, newPassword } = req.body;

  let user = await User.findById(userId);

  if (password) {
    if (!(await bcrypt.compare(password, user.password))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect password');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.save();
    return res.status(httpStatus.NO_CONTENT).send();
  }

  if (avatar && user.avatar) {
    deleteFile(user.avatar);
  }

  user = await User.findByIdAndUpdate(userId, { email, dob, phoneNumber, fullName, avatar }, { new: true });
  res.send({ user });
};

const getUser = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  res.send({ user });
};

const getUsers = async (req, res, next) => {
  const resId = req.user.restaurent;
  const users = await User.find({ restaurent: resId });
  res.send({ users });
};

const deleteUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  await User.findByIdAndDelete(user.id);
  res.send({});
};

module.exports = { updateUser, getUser, getUsers, deleteUser };
