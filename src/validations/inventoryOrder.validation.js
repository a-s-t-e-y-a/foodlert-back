const Joi = require("joi");
const { objectId } = require("./custom.validation");

const itemObject = {
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
  price: Joi.number(),
  total: Joi.number(),
};

const createInventoryOrder = {
  body: Joi.object({
    recievedBy: Joi.string().custom(objectId).required(),
    paymentBy: Joi.string()
      .trim()
      .lowercase()
      .valid("cash", "eftpos", "credit")
      .required(),
    notes: Joi.string().trim(),
    orderDate: Joi.string().trim().required(),
    deliveryDate: Joi.string().trim(),
    status: Joi.string()
      .trim()
      .lowercase()
      .valid("open", "ordered", "cancelled"),
    itemDetails: Joi.object().keys(itemObject).required(),
  }),
};

const updateInventoryOrder = {
  body: Joi.object({
    orderedBy: Joi.string().custom(objectId),
    recievedBy: Joi.string().custom(objectId),
    paymentBy: Joi.string()
      .trim()
      .lowercase()
      .valid("cash", "eftpos", "credit"),
    notes: Joi.string().trim(),
    orderDate: Joi.string().trim(),
    deliveryDate: Joi.string().trim(),
    status: Joi.string()
      .trim()
      .lowercase()
      .valid("open", "ordered", "cancelled"),
    itemDetails: Joi.object().keys(itemObject),
  }),
};

module.exports = { createInventoryOrder, updateInventoryOrder };
