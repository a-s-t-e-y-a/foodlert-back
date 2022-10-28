const httpStatus = require('http-status');
const validateSchema = require('./../validations/schema.validation');
require('express-async-errors');
const ApiError = require('./../utils/ApiError');

// const supplierCartValidation = require('../validations/supplier.cart.validation');

const supplierCartService = require('../services/supplier.cart.service');

const addItemToSupplierCart = async (req, res, next) => {
  // const err = validateSchema(req, supplierValidation.createSupplier);
  // if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const { item, unit, quantity, storeUnit, supQty, supSub, total, min, max, inHand } = req.body;
  const supplierId = req.params.id;
  const createdCartItem = await supplierCartService.addItemToSupplierCart({
    supplierId,
    item,
    unit,
    quantity,
    storeUnit,
    supQty,
    supSub,
    total,
    min,
    max,
    inHand
  });
  res.status(httpStatus.CREATED).send({ createdCartItem });
};

const getAllSupplierCartItem = async (req, res, next) => {
  const supplierId = req.params.id;
  const supplierCart = await supplierCartService.getAllSupplierCartItem({ supplierId });
  res.status(httpStatus.CREATED).send({ supplierCart });
};

// const updateSupplierCartItem = async (req, res, next) => {
//   const supplierId = req.params.id;
//   const cartItemId = req.params.cartItemId;

//   const updateSupplierCartItem = await supplierCartService.updateSupplierCartItem({
//     supplierId,
//     cartItemId,
//     body: req.body
//   });
//   res.status(httpStatus.CREATED).send({ updateSupplierCartItem });
// };

const deleteSupplierCartItem = async (req, res, next) => {
  const supplierId = req.params.id;
  const cartItemId = req.params.cartItemId;

  await supplierCartService.deleteSupplierCartItem({ supplierId, cartItemId });
  res.status(httpStatus.CREATED).send({});
};

module.exports = { addItemToSupplierCart, getAllSupplierCartItem, deleteSupplierCartItem };
