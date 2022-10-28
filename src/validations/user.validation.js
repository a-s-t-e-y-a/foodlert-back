const Joi = require('joi');

const { objectId, phoneNumber, password, pin } = require('./custom.validation');

const updateUser = {
  params: Joi.object({ userId: Joi.string().custom(objectId).required() }),
  body: Joi.object({
    email: Joi.string(),
    dob: Joi.date(),
    fullName: Joi.string(),
    phoneNumber: Joi.string().custom(phoneNumber),
    password: Joi.string().custom(password),
    newPassword: Joi.string().custom(password),
    pin: Joi.number().custom(pin)
  }).with('password', 'newPassword')
};

const getUser = {
  params: Joi.object({ userId: Joi.string().custom(objectId).required() })
};

const getUsers = {};

module.exports = {
  updateUser,
  getUser,
  getUsers
};
