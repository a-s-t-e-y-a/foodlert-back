const httpStatus = require("http-status");
const validateSchema = require("./../validations/schema.validation");
const ApiError = require("./../utils/ApiError");
require("express-async-errors");

const inventorySupplierCartValidation = require("../validations/inventorySupplierCart.validation");

const inventorySupplierCartService = require("../services/inventorySupplierCart.service");

const createInventorySupplierCart = async (req, res, next) => {
  const err = validateSchema(
    req,
    inventorySupplierCartValidation.createInventorySupplierCart
  );
  if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const { item, quantity, subQuantity, subSubQuantity, price, total } =
    req.body;
  const id = req.params.id;

  const createdInventorySupplierCart =
    await inventorySupplierCartService.createInventorySupplierCart({
      id,
      item,
      quantity,
      subQuantity,
      subSubQuantity,
      price,
      total,
    });
  res.status(httpStatus.CREATED).send({ createdInventorySupplierCart });
};

const getAllInventorySupplierCart = async (req, res, next) => {
  const id = req.params.id;

  const getAllInventorySupplierCart =
    await inventorySupplierCartService.getAllInventorySupplierCart({ id });
  res
    .status(httpStatus.CREATED)
    .send({
      totalInventorySupplierCart: getAllInventorySupplierCart.length,
      getAllInventorySupplierCart,
    });
};

const updateInventorySupplierCart = async (req, res, next) => {
  const err = validateSchema(
    req,
    inventorySupplierCartValidation.updateInventorySupplierCart
  );
  if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const id = req.params.id;
  const cartId = req.params.cartId;

  const updatedInventorySupplierCart =
    await inventorySupplierCartService.updateInventorySupplierCart({
      id,
      cartId,
      body: req.body,
    });
  res.status(httpStatus.CREATED).send({ updatedInventorySupplierCart });
};

const deleteInventorySupplierCart = async (req, res, next) => {
  const {} = req.body;

  const id = req.params.id;
  const cartId = req.params.cartId;

  await inventorySupplierCartService.deleteInventorySupplierCart({
    id,
    cartId,
  });
  res.status(httpStatus.CREATED).send({});
};

module.exports = {
  createInventorySupplierCart,
  getAllInventorySupplierCart,
  updateInventorySupplierCart,
  deleteInventorySupplierCart,
};
