const Joi = require('joi');

const createInventorySupplierCart = {
  body: Joi.object({
    item: Joi.string().required(),
    quantity: Joi.object().keys({ value: Joi.number().required(), unit: Joi.string().required() }),
    supQuantity: Joi.object().keys({ value: Joi.number(), unit: Joi.string() }),
    supsupQuantity: Joi.object().keys({ value: Joi.number(), unit: Joi.string() }),
    price: Joi.number().required(),
    total: Joi.number()
  })
};

const updateInventorySupplierCart = {
  body: Joi.object({
    item: Joi.string(),
    quantity: Joi.object().keys({ value: Joi.number(), unit: Joi.string() }),
    supQuantity: Joi.object().keys({ value: Joi.number(), unit: Joi.string() }),
    supsupQuantity: Joi.object().keys({ value: Joi.number(), unit: Joi.string() }),
    price: Joi.number(),
    total: Joi.number()
  })
};

module.exports = { createInventorySupplierCart, updateInventorySupplierCart };
