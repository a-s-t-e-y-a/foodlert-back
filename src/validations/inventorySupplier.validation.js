const Joi = require('joi');
const { objectId, email } = require('./custom.validation');

const cartObject = {
  item: Joi.string().required(),
  quantity: Joi.object().keys({ value: Joi.number().required(), unit: Joi.string().required() }),
  supQuantity: Joi.object().keys({ value: Joi.number(), unit: Joi.string() }),
  supsupQuantity: Joi.object().keys({ value: Joi.number(), unit: Joi.string() }),
  price: Joi.number(),
  total: Joi.number()
};

const createInventorySupplier = {
  body: Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().custom(email),
    portalUrl: Joi.string().trim(),
    mobileNo: Joi.number(),
    phoneNo: Joi.number(),
    address: Joi.string().trim(),
    image: Joi.string().trim(),
    orderVia: Joi.string().trim().lowercase().valid('email', 'sms', 'portal', 'link via sms'),
    minOrderValue: Joi.number(),
    deliveryFee: Joi.number(),
    deliveryInstructions: Joi.string().trim(),
    cart: Joi.object().keys(cartObject),
    order: Joi.string().custom(objectId)
  })
};
const updateInventorySupplier = {
  body: Joi.object({
    name: Joi.string().trim(),
    email: Joi.string().custom(email),
    portalUrl: Joi.string().trim(),
    mobileNo: Joi.number(),
    phoneNo: Joi.number(),
    address: Joi.string().trim(),
    image: Joi.string().trim(),
    orderVia: Joi.string().trim().lowercase().valid('email', 'sms', 'portal', 'link via sms'),
    minOrderValue: Joi.number(),
    deliveryFee: Joi.number(),
    deliveryInstructions: Joi.string().trim()
  })
};

module.exports = { createInventorySupplier, updateInventorySupplier };
