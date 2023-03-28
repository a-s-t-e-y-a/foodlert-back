const httpStatus = require('http-status');
require('express-async-errors');

const jwt = require('jsonwebtoken');

const config = require('../utils/config');

const authValidation = require('../validations/auth.validation');

const authService = require('../services/auth.service');
const userService = require('../services/user.service');
const ApiError = require('../utils/ApiError');

const generateToken = (userId, secret = config.jwt.secret) => {
  const payload = {
    sub: userId
  };

  return jwt.sign(payload, secret, { expiresIn: '12h' });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.login(email, password);
  const time =  Date()
  const array = time.split(" ")
  const user_login_time = array[4]
  const loginUserTime = await authService.login_time(user_login_time)
console.log(user_login_time)
  if (!user.emailVerified) {
    const otpId = await authService.sendOtp(user);
    return res.json({ message: 'verification OTP sent to your email', token: otpId });
  }
  const token = generateToken(user.id);
  res.json({ user, token, authenticated: true ,loginUserTime});
};

const logout = async (req, res, next) => {
  console.log(req.body)
 const logoutUser = await authService.logout(req.body)
 res.json({logoutUser})

  
};

const verifyOtp = async (req, res, next) => {
  const { otp, token: otpId } = req.body;

  const user = await authService.verifyOtp(otpId, otp);
  const token = generateToken(user.id);
  res.json({ user, token, authenticated: true});
};

const resetPassword = async (req, res, next) => {};

const verifyToken = async (req, res, next) => {
  const { token } = req.body;
  let decoded;
  try {
    decoded = jwt.verify(token, config.jwt.secret);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Invalid token, login first!' });
  }

  let user = await userService.getUserById(decoded.sub);
  user = user.toJSON();
  res.send({ user, token, authenticated: true });
};

module.exports = {
  login,
  logout,
  verifyOtp,
  resetPassword,
  verifyToken
};
