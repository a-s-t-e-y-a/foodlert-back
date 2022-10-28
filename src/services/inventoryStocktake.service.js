const { ObjectId } = require('mongoose').Types;
require('express-async-errors');
const inventoryStocktakeModel = require('./../models/inventoryStocktake.model');

const createInventoryStocktake = async ({
  itemName,
  price,
  minStock,
  quantity,
  supQuantity,
  supsupQuantity,
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
  history
}) => {
  const createdInventoryStocktake = await inventoryStocktakeModel.create({
    itemName,
    price,
    minStock,
    quantity,
    supQuantity,
    supsupQuantity,
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
    history
  });

  return createdInventoryStocktake;
};

const getAllInventoryStocktake = async () => {
  const getAllInventoryStocktake = await inventoryStocktakeModel.find();

  return getAllInventoryStocktake;
};
const getInventoryStocktake = async ({ id }) => {
  const getAllInventoryStocktake = await inventoryStocktakeModel.findById(id);

  return getAllInventoryStocktake;
};
const updateInventoryStocktake = async ({ id, body }) => {
  const updatedInventoryStocktake = await inventoryStocktakeModel.findByIdAndUpdate(id, body, { new: true });

  return updatedInventoryStocktake;
};

const deleteInventoryStocktake = async ({ id, body }) => {
  await inventoryStocktakeModel.findByIdAndDelete(id);
};

module.exports = {
  createInventoryStocktake,
  getAllInventoryStocktake,
  getInventoryStocktake,
  updateInventoryStocktake,
  deleteInventoryStocktake
};
