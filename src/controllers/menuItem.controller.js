const httpStatus = require('http-status');
const validateSchema = require('./../validations/schema.validation');
const ApiError = require('./../utils/ApiError');
require('express-async-errors');

const menuItemValidation = require('../validations/menuItem.validation');

const menuItemService = require('../services/menuItem.service');

const createMenuItem = async (req, res, next) => {
  const err = validateSchema(req, menuItemValidation.createMenuItem);
  if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const { item, category, season, sellingPrice, preparingTime, manual, rawMaterial, itemDetails } = req.body;

  const createdMenuItem = await menuItemService.createMenuItem({
    item,
    category,
    season,
    sellingPrice,
    preparingTime,
    manual,
    rawMaterial,
    itemDetails
  });
  res.status(httpStatus.CREATED).send({ createdMenuItem });
};

const getAllMenuItem = async (req, res, next) => {
  const getAllMenuItem = await menuItemService.getAllMenuItem();
  res.status(httpStatus.CREATED).send({ totalMenuItem: getAllMenuItem.length, getAllMenuItem });
};

const getMenuItem = async (req, res, next) => {
  const id = req.params.id;
  const getMenuItem = await menuItemService.getMenuItem({ id });
  res.status(httpStatus.CREATED).send({ getMenuItem });
};

const updateMenuItem = async (req, res, next) => {
  const err = validateSchema(req, menuItemValidation.updateMenuItem);
  if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const id = req.params.id;

  const updatedMenuItem = await menuItemService.updateMenuItem({ id, body: req.body });
  res.status(httpStatus.CREATED).send({ updatedMenuItem });
};

const deleteMenuItem = async (req, res, next) => {
  const id = req.params.id;

  await menuItemService.deleteMenuItem({ id });
  res.status(httpStatus.CREATED).send({});
};

module.exports = { createMenuItem, getAllMenuItem, updateMenuItem, getMenuItem, deleteMenuItem };
