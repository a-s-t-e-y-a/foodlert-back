const httpStatus = require('http-status');
const validateSchema = require('./../validations/schema.validation');
const ApiError = require('./../utils/ApiError');
require('express-async-errors');

const inventoryOrderValidation = require('../validations/inventoryOrder.validation');

const inventoryOrderService = require('../services/inventoryOrder.service');

const createInventoryOrder = async (req, res, next) => {
  const err = validateSchema(req, inventoryOrderValidation.createInventoryOrder);
  if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const { orderedBy, recievedBy, paymentBy, notes, orderDate, deliveryDate, status, itemDetails } = req.body;

  const createdInventoryOrder = await inventoryOrderService.createInventoryOrder({
    orderedBy,
    recievedBy,
    paymentBy,
    notes,
    orderDate,
    deliveryDate,
    status,
    itemDetails
  });
  res.status(httpStatus.CREATED).send({ createdInventoryOrder });
};

const getAllInventoryOrder = async (req, res, next) => {
  const getAllInventoryOrder = await inventoryOrderService.getAllInventoryOrder();
  res.status(httpStatus.CREATED).send({ totalInventoryOrder: getAllInventoryOrder.length, getAllInventoryOrder });
};

const getInventoryOrder = async (req, res, next) => {
  const id = req.params.id;
  const getInventoryOrder = await inventoryOrderService.getInventoryOrder({ id });
  res.status(httpStatus.CREATED).send({ getInventoryOrder });
};

const updateInventoryOrder = async (req, res, next) => {
  const err = validateSchema(req, inventoryOrderValidation.updateInventoryOrder);
  if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const id = req.params.id;

  const updatedInventoryOrder = await inventoryOrderService.updateInventoryOrder({ id, body: req.body });
  res.status(httpStatus.CREATED).send({ updatedInventoryOrder });
};

const deleteInventoryOrder = async (req, res, next) => {
  const id = req.params.id;

  await inventoryOrderService.deleteInventoryOrder({ id });
  res.status(httpStatus.CREATED).send({});
};

module.exports = {
  createInventoryOrder,
  getAllInventoryOrder,
  updateInventoryOrder,
  getInventoryOrder,
  deleteInventoryOrder
};
