const Joi = require('joi');
const { objectId, email } = require('./custom.validation');

const createSupplier = {
  body: Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().custom(email).required(),
    url: Joi.string().trim(),
    mobile: Joi.number(),
    phone: Joi.number(),
    orderVia: Joi.string().trim().lowercase().valid('email', 'sms', 'portal', 'link vis sms'),
    minOrderValue: Joi.number(),
    deliveryFee: Joi.number(),
    deliveryInstruction: Joi.string().trim()
  })
};

module.exports = { createSupplier };
