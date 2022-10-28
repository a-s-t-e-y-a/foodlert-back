const Joi = require('joi');
const { objectId } = require('./custom.validation');

const historyObject = {
  date: Joi.string(),
  by: Joi.string(),
  action: Joi.number(),
  quantity: Joi.number(),
  total: Joi.number()
};

const createInventoryStocktake = {
  body: Joi.object({
    itemName: Joi.string().trim().required(),
    price: Joi.number(),
    minStock: Joi.number(),
    quantity: Joi.object().keys({ value: Joi.number().required(), unit: Joi.string().required() }),
    supQuantity: Joi.object({ value: Joi.number().required(), unit: Joi.string().required() }),
    supsupQuantity: Joi.object({ value: Joi.number().required(), unit: Joi.string().required() }),
    total: Joi.number(),
    supplier: Joi.string(),
    storage: Joi.string(),
    purchased: Joi.number(),
    begin: Joi.number(),
    sold: Joi.number(),
    waste: Joi.number(),
    stock: Joi.number(),
    inStock: Joi.number(),
    orderDate: Joi.string(),
    lastOrderDate: Joi.string(),
    lastOrderRecieved: Joi.string(),
    history: Joi.array().items(Joi.object().keys(historyObject))
  })
};

module.exports = { createInventoryStocktake };
