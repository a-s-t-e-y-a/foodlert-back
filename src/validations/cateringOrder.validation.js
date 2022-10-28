const Joi = require('joi');
const { objectId } = require('./custom.validation');

const clientObject = {
  name: Joi.string().trim().required(),

  phoneNo: Joi.number().required(),

  address: Joi.string(),

  type: Joi.string().lowercase().valid('delivery', 'pick up'),

  date: Joi.string(),

  time: Joi.string(),

  image: Joi.string()
};

const orderDetails = {
  item: Joi.string().required(),
  price: Joi.number(),
  quantity: Joi.number()
};

const createCateringOrder = {
  body: Joi.object({
    orderedBy: Joi.object().keys(clientObject).required(),
    bookedBy: Joi.string(),
    approvedBy: Joi.string(),
    paymentBy: Joi.string().lowercase().valid('cash', 'eftpos', 'credit'),
    upfrontPaid: Joi.number(),
    notes: Joi.string().required(),
    orderDate: Joi.string(),
    deliveryDate: Joi.string(),
    status: Joi.string(),
    totalAmount: Joi.number(),
    orderDetails: Joi.array().items(Joi.object().keys(orderDetails))
  })
};

const updateCateringOrder = {
  body: Joi.object({
    orderedBy: Joi.object().keys(clientObject).required(),
    bookedBy: Joi.string(),
    approvedBy: Joi.string(),
    paymentBy: Joi.string().valid('Cash', 'Eftpos', 'Credit'),
    upfrontPaid: Joi.number(),
    notes: Joi.string(),
    orderDate: Joi.string(),
    deliveryDate: Joi.string(),
    status: Joi.string(),
    totalAmount: Joi.string(),
    orderDetails: Joi.array().items(Joi.object().keys(orderDetails))
  })
};

module.exports = { createCateringOrder, updateCateringOrder };
