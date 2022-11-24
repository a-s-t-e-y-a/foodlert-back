const httpStatus = require("http-status");
const validateSchema = require("./../validations/schema.validation");
const ApiError = require("./../utils/ApiError");
require("express-async-errors");

const inventoryStocktakeValidation = require("../validations/inventoryStocktake.validation");

const inventoryStocktakeService = require("../services/inventoryStocktake.service");

const createInventoryStocktake = async (req, res, next) => {
  const err = validateSchema(
    req,
    inventoryStocktakeValidation.createInventoryStocktake
  );
  if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const {
    itemName,
    price,
    minStock,
    quantity,
    subQuantity,
    subSubQuantity,
    total,
    supplier,
    storage,
    purchased,
    begin,
    sold,
    waste,
    stock,
    inStock,
    orderDate,
    lastOrderDate,
    lastOrderRecieved,
    history,
  } = req.body;

  const createdInventoryStocktake =
    await inventoryStocktakeService.createInventoryStocktake({
      itemName,
      price,
      minStock,
      quantity,
      subQuantity,
      subSubQuantity,
      total,
      supplier,
      storage,
      purchased,
      begin,
      sold,
      waste,
      stock,
      inStock,
      orderDate,
      lastOrderDate,
      lastOrderRecieved,
      history,
      createdBy: req.user.id,
    });
  res.status(httpStatus.CREATED).send({ createdInventoryStocktake });
};

const getAllInventoryStocktake = async (req, res, next) => {
  const getAllInventoryStocktake =
    await inventoryStocktakeService.getAllInventoryStocktake();
  res.status(httpStatus.CREATED).send({
    totalInventoryStocktake: getAllInventoryStocktake.length,
    getAllInventoryStocktake,
  });
};

const getInventoryStocktake = async (req, res, next) => {
  const id = req.params.id;
  const getInventoryStocktake =
    await inventoryStocktakeService.getInventoryStocktake({ id });
  res.status(httpStatus.CREATED).send({ getInventoryStocktake });
};

const updateInventoryStocktake = async (req, res, next) => {
  const id = req.params.id;

  const updatedInventoryStocktake =
    await inventoryStocktakeService.updateInventoryStocktake({
      id,
      body: req.body,
    });
  res.status(httpStatus.CREATED).send({ updatedInventoryStocktake });
};

const deleteInventoryStocktake = async (req, res, next) => {
  const id = req.params.id;

  await inventoryStocktakeService.deleteInventoryStocktake({ id });
  res.status(httpStatus.CREATED).send({});
};

const addItemToStocktake = async (req, res, next) => {
  const { supplierId, cartId } = req.params;
  const userId = req.user.id;
  const updatedDetails = await inventoryStocktakeService.addItemToStocktake({
    userId,
    supplierId,
    cartId,
  });
  res.status(httpStatus.CREATED).send({ updatedDetails });
};

module.exports = {
  createInventoryStocktake,
  getAllInventoryStocktake,
  updateInventoryStocktake,
  getInventoryStocktake,
  deleteInventoryStocktake,
  addItemToStocktake,
};
