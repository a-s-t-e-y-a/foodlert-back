const Joi = require('joi');

const login = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
};

const logout = {};

const verifyOtp = {
  body: Joi.object({
    otp: Joi.string().trim().required(),
    token: Joi.string().trim().required()
  })
};

const verifyToken = {
  body: Joi.object({
    token: Joi.string().required()
  })
};

module.exports = {
  login,
  logout,
  verifyOtp,
  verifyToken
};
