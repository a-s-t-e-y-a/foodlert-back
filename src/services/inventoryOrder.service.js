const { ObjectId } = require('mongoose').Types;
require('express-async-errors');
const inventoryOrderModel = require('./../models/inventoryOrder.model');

const createInventoryOrder = async ({
  orderedBy,
  recievedBy,
  paymentBy,
  notes,
  orderDate,
  deliveryDate,
  status,
  itemDetails
}) => {
  const createdInventoryOrder = await inventoryOrderModel.create({
    orderedBy,
    recievedBy,
    paymentBy,
    notes,
    orderDate,
    deliveryDate,
    status,
    itemDetails
  });

  return createdInventoryOrder;
};

const getAllInventoryOrder = async () => {
  const getAllInventoryOrder = await inventoryOrderModel.find();

  return getAllInventoryOrder;
};
const getInventoryOrder = async ({ id }) => {
  const getAllInventoryOrder = await inventoryOrderModel.findById(id);

  return getAllInventoryOrder;
};
const updateInventoryOrder = async ({ id, body }) => {
  const updatedInventoryOrder = await inventoryOrderModel.findByIdAndUpdate(id, body, { new: true });

  return updatedInventoryOrder;
};

const deleteInventoryOrder = async ({ id, body }) => {
  await inventoryOrderModel.findByIdAndDelete(id);
};

module.exports = {
  createInventoryOrder,
  getAllInventoryOrder,
  getInventoryOrder,
  updateInventoryOrder,
  deleteInventoryOrder
};
