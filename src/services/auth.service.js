const otpGenerator = require('otp-generator');
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const {logout_model,login_model} = require("../models/logout.model")

const config = require('../utils/config');
const ApiError = require('../utils/ApiError');
const emailService = require('./email.service');

const Otp = require('../models/Otp.model');
const User = require('../models/user.model');

const generateOtp = () => {
  return otpGenerator.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
  });
};

const sendOtp = async (user) => {
  const otp = generateOtp();
  await emailService.sendOTPEmail(user.email, otp);
  const expires = dayjs(new Date()).add(config.otp.accessExpirationMinutes, 'minute');
  const otpDoc = await Otp.create({ otp, expires, user: user.id });
  return otpDoc.id;
};

const verifyOtp = async (otpId, otp) => {
  const otpDoc = await Otp.findById(otpId);
  if (!otpDoc || otpDoc.otp !== otp) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid otp');
  }

  const otpExpired = dayjs().isAfter(otpDoc.expires);
  if (otpExpired) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'OTP expired');
  }

  const user = await User.findByIdAndUpdate(otpDoc.user, { emailVerified: true }, { new: true });
  await Otp.deleteMany({ user: otpDoc.user });
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email }).populate('branch');
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  return user;
};
const login_time = async(time)=>{
  console.log(time)
  const userLoginTime = await login_model.create({login_time:time})
  return userLoginTime;
}

const logout = async (time) => {
  const logoutUser = await logout_model.create(time)
  return logoutUser
};

module.exports = {
  sendOtp,
  verifyOtp,
  login,
  logout,
  login_time
};
