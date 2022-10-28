const httpStatus = require('http-status');
const validateSchema = require('./../validations/schema.validation');
const ApiError = require('./../utils/ApiError');
require('express-async-errors');

const inventorySupplierValidation = require('../validations/inventorySupplier.validation');

const inventorySupplierService = require('../services/inventorySupplier.service');

const createInventorySupplier = async (req, res, next) => {
  const err = validateSchema(req, inventorySupplierValidation.createInventorySupplier);
  if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const {
    name,
    email,
    portalUrl,
    mobileNo,
    phoneNo,
    address,
    image,
    orderVia,
    minOrderValue,
    deliveryFee,
    deliveryInstructions,
    cart,
    order
  } = req.body;

  const createdInventorySupplier = await inventorySupplierService.createInventorySupplier({
    name,
    email,
    portalUrl,
    mobileNo,
    phoneNo,
    address,
    image,
    orderVia,
    minOrderValue,
    deliveryFee,
    deliveryInstructions,
    cart,
    order
  });
  res.status(httpStatus.CREATED).send({ createdInventorySupplier });
};

const getAllInventorySupplier = async (req, res, next) => {
  const getAllInventorySupplier = await inventorySupplierService.getAllInventorySupplier();
  res.status(httpStatus.CREATED).send({ totalInventorySupplier: getAllInventorySupplier.length, getAllInventorySupplier });
};

const getInventorySupplier = async (req, res, next) => {
  const id = req.params.id;
  const getInventorySupplier = await inventorySupplierService.getInventorySupplier({ id });
  res.status(httpStatus.CREATED).send({ getInventorySupplier });
};

const updateInventorySupplier = async (req, res, next) => {
  const err = validateSchema(req, inventorySupplierValidation.updateInventorySupplier);
  if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const id = req.params.id;

  const updatedInventorySupplier = await inventorySupplierService.updateInventorySupplier({ id, body: req.body });
  res.status(httpStatus.CREATED).send({ updatedInventorySupplier });
};

const deleteInventorySupplier = async (req, res, next) => {
  const {} = req.body;

  const id = req.params.id;

  await inventorySupplierService.deleteInventorySupplier({ id });
  res.status(httpStatus.CREATED).send({});
};

module.exports = {
  createInventorySupplier,
  getAllInventorySupplier,
  updateInventorySupplier,
  getInventorySupplier,
  deleteInventorySupplier
};
