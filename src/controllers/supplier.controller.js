const httpStatus = require('http-status');
const validateSchema = require('./../validations/schema.validation');
require('express-async-errors');
const ApiError = require('./../utils/ApiError');

const supplierValidation = require('../validations/supplier.validation');

const supplierService = require('../services/supplier.service');

const createSupplier = async (req, res, next) => {
  const err = validateSchema(req, supplierValidation.createSupplier);
  if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const { name, email, url, mobile, phone, orderVia, minOrderValue, deliveryFee, deliveryInstruction } = req.body;
  const image = req.file?.filename ?? '';
  const createdSupplier = await supplierService.createSupplier({
    name,
    email,
    url,
    mobile,
    phone,
    orderVia,
    minOrderValue,
    deliveryFee,
    deliveryInstruction,
    image
  });
  res.status(httpStatus.CREATED).send({ createdSupplier });
};

const getSupplier = async (req, res, next) => {
  const id = req.params.id;
  const supplier = await supplierService.getSupplier({ id });
  res.status(httpStatus.CREATED).send({ supplier });
};

const getAllSupplier = async (req, res, next) => {
  const suppliers = await supplierService.getAllSupplier();
  res.status(httpStatus.CREATED).send({ suppliers });
};

const updateSupplier = async (req, res, next) => {
  const id = req.params.id;
  const updatedSupplier = await supplierService.updateSupplier({
    id,
    body: req.body
  });
  res.status(httpStatus.CREATED).send({ updatedSupplier });
};

const deleteSupplier = async (req, res, next) => {
  const id = req.params.id;
  await supplierService.deleteSupplier({ id });
  res.status(httpStatus.CREATED).send({});
};

module.exports = { createSupplier, getSupplier, getAllSupplier, updateSupplier, deleteSupplier };
