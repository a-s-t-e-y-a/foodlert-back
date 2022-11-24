const { ObjectId } = require("mongoose").Types;
require("express-async-errors");
const inventorySupplierModel = require("./../models/inventorySupplier.model");

const createInventorySupplier = async ({
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
  order,
  department,
}) => {
  const createdInventorySupplier = await inventorySupplierModel.create({
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
    order,
    department,
  });

  return createdInventorySupplier;
};

const getAllInventorySupplier = async () => {
  const getAllInventorySupplier = await inventorySupplierModel.find();

  return getAllInventorySupplier;
};
const getInventorySupplier = async ({ id }) => {
  const getAllInventorySupplier = await inventorySupplierModel.findById(id);

  return getAllInventorySupplier;
};
const updateInventorySupplier = async ({ id, body }) => {
  const updatedInventorySupplier =
    await inventorySupplierModel.findByIdAndUpdate(id, body, { new: true });

  return updatedInventorySupplier;
};

const deleteInventorySupplier = async ({ id }) => {
  await inventorySupplierModel.findByIdAndDelete(id);
};

module.exports = {
  createInventorySupplier,
  getAllInventorySupplier,
  getInventorySupplier,
  updateInventorySupplier,
  deleteInventorySupplier,
};
