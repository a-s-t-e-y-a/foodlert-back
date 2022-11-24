const Joi = require("joi");

const createInventorySupplierCart = {
  body: Joi.object({
    item: Joi.string().required(),
    quantity: Joi.object().keys({
      value: Joi.number().required(),
      unit: Joi.string().required(),
    }),
    subQuantity: Joi.object().keys({ value: Joi.number(), unit: Joi.string() }),
    subSubQuantity: Joi.object().keys({
      value: Joi.number(),
      unit: Joi.string(),
    }),
    price: Joi.number().required(),
    total: Joi.number(),
  }),
};

const updateInventorySupplierCart = {
  body: Joi.object({
    item: Joi.string(),
    quantity: Joi.object().keys({ value: Joi.number(), unit: Joi.string() }),
    subQuantity: Joi.object().keys({ value: Joi.number(), unit: Joi.string() }),
    subSubQuantity: Joi.object().keys({
      value: Joi.number(),
      unit: Joi.string(),
    }),
    price: Joi.number(),
    total: Joi.number(),
  }),
};

module.exports = { createInventorySupplierCart, updateInventorySupplierCart };
