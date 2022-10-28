const Joi = require('joi');

const { objectId, password, phoneNumber } = require('./custom.validation');

const createRestaurent = {
  body: Joi.object({
    businessName: Joi.string().trim().required(),
    fullName: Joi.string().trim().required(),
    phoneNumber: Joi.string().custom(phoneNumber).required(),
    email: Joi.string().lowercase().email().trim().required(),
    password: Joi.string().custom(password).required()
  })
};

const getRestaurent = {
  params: Joi.object({ restaurentId: Joi.string().custom(objectId).required() })
};

// const updateRestaurent = {
//   params: Joi.object({ restaurentId: Joi.string().custom(objectId).required() }),
//   body: Joi.object({
//     bankName: Joi.string().trim(),
//     bankAccount: Joi.string().trim(),
//     currency: Joi.string().trim(),
//     venueName: Joi.string().trim(),
//     location: Joi.string().trim(),
//     timeFormat: Joi.string().valid('12 hr', '24 hr'),
//     timeZone: Joi.string(),
//     payrollType: Joi.string().valid('Weekly', 'Fortnightly', 'Monthly'),
//     cashAmount: Joi.number(),
//     safeAmount: Joi.number(),
//     closingAmount: Joi.number(),
//     notification: notificationSchema
//   })
// };

const deleteRestaurent = {
  params: Joi.object({ restaurentId: Joi.string().custom(objectId).required() })
};
module.exports = {
  createRestaurent,
  getRestaurent,
  deleteRestaurent
};
