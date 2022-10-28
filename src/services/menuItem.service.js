const { ObjectId } = require('mongoose').Types;
require('express-async-errors');
const menuItemModel = require('./../models/menuItem.model');

const createMenuItem = async ({ item, category, season, sellingPrice, preparingTime, manual, rawMaterial, itemDetails }) => {
  const createdMenuItem = await menuItemModel.create({
    item,
    category,
    season,
    sellingPrice,
    preparingTime,
    manual,
    rawMaterial,
    itemDetails
  });

  return createdMenuItem;
};

const getAllMenuItem = async () => {
  const getAllMenuItem = await menuItemModel.find();

  return getAllMenuItem;
};
const getMenuItem = async ({ id }) => {
  const getAllMenuItem = await menuItemModel.findById(id);

  return getAllMenuItem;
};
const updateMenuItem = async ({ id, body }) => {
  const updatedMenuItem = await menuItemModel.findByIdAndUpdate(id, body, { new: true });

  return updatedMenuItem;
};

const deleteMenuItem = async ({ id }) => {
  await menuItemModel.findByIdAndDelete(id);
};

module.exports = {
  createMenuItem,
  getAllMenuItem,
  getMenuItem,
  updateMenuItem,
  deleteMenuItem
};
