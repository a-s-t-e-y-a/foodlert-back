const httpStatus = require('http-status');
const validateSchema = require('./../validations/schema.validation');
const ApiError = require('./../utils/ApiError');
require('express-async-errors');

const cateringOrderValidation = require('../validations/cateringOrder.validation');

const cateringOrderService = require('../services/cateringOrder.service');

const createCateringOrder = async (req, res, next) => {
  const err = validateSchema(req, cateringOrderValidation.createCateringOrder);
  if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const {
    orderedBy,
    bookedBy,
    approvedBy,
    paymentBy,
    notes,
    orderDate,
    deliveryDate,
    status,
    totalAmount,
    randomAmount,
    upfrontPaid,
    orderDetails
  } = req.body;

  const createdCateringOrder = await cateringOrderService.createCateringOrder({
    orderedBy,
    bookedBy,
    approvedBy,
    paymentBy,
    notes,
    orderDate,
    deliveryDate,
    status,
    totalAmount,
    randomAmount,
    upfrontPaid,
    orderDetails,
    markAsDelivery : false
  });
  res.status(httpStatus.CREATED).send({ createdCateringOrder });
};

const getAllCateringOrder = async (req, res, next) => {
  const getAllCateringOrder = await cateringOrderService.getAllCateringOrder();
  res.status(httpStatus.CREATED).send({ totalCateringOrder: getAllCateringOrder.length, getAllCateringOrder });
};

const getCateringOrder = async (req, res, next) => {
  const id = req.params.id;
  const getCateringOrder = await cateringOrderService.getCateringOrder({ id });
  res.status(httpStatus.CREATED).send({ getCateringOrder });
};

const updateCateringOrder = async (req, res, next) => {
  const id = req.params.id;

  const updatedCateringOrder = await cateringOrderService.updateCateringOrder({ id, body: req.body });
  res.status(httpStatus.CREATED).send({ updatedCateringOrder });
};

const deleteCateringOrder = async (req, res, next) => {
  const id = req.params.id;

  await cateringOrderService.deleteCateringOrder({ id });
  res.status(httpStatus.CREATED).send({});
};

module.exports = { createCateringOrder, getAllCateringOrder, updateCateringOrder, getCateringOrder, deleteCateringOrder };
