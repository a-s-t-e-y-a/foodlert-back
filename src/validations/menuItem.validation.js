const Joi = require('joi');
const { objectId } = require('./custom.validation');

const manual = {
  amount: Joi.number().required(),
  meaursement: Joi.string().required(),
  ingredients: Joi.string(),
  image: Joi.string(),
  directions: Joi.string()
};
const rawMaterial = {
  item: Joi.string().required(),
  unit: Joi.string().required(),
  quantity: Joi.number(),
  total: Joi.number()
};
const itemDetails = {
  nutriScore: Joi.string().valid('A', 'B', 'C', 'D', 'E').required(),
  delivarable: Joi.boolean(),
  tag: Joi.array()
};

const createMenuItem = {
  body: Joi.object({
    item: Joi.string().required(),
    category: Joi.string(),
    season: Joi.string(),
    sellingPrice: Joi.number(),
    preparingTime: Joi.string(),
    manual: Joi.array().items(Joi.object().keys(manual)),
    rawMaterial: Joi.array().items(Joi.object().keys(rawMaterial)),
    itemDetails: Joi.object().keys(itemDetails)
  })
};

const updateMenuItem = {
  body: Joi.object({
    item: Joi.string(),
    category: Joi.string(),
    season: Joi.string(),
    sellingPrice: Joi.number(),
    preparingTime: Joi.string(),
    manual: Joi.array().items(Joi.object().keys(manual)),
    rawMaterial: Joi.array().items(Joi.object().keys(rawMaterial)),
    itemDetails: Joi.object().keys(itemDetails)
  })
};

module.exports = { createMenuItem, updateMenuItem };
