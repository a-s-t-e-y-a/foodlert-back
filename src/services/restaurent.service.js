const httpStatus = require('http-status');
require('express-async-errors');

const ApiError = require('../utils/ApiError');
const Restaurent = require('../models/restaurent.model');

const createRestaurent = async (businessName, userId) => {
  const restaurent = await Restaurent.create({ businessName, owner: userId });
  return restaurent;
};

const getRestaurent = async (restaurentId) => {
  const restaurent = await Restaurent.findById(restaurentId).populate('owner');
  return restaurent;
};

const getAllRestaurent = async (restaurentId) => {
  const restaurent = await Restaurent.find().populate('owner');
  return restaurent;
};

// const updateRestaurent = async (restaurentId, updateBody) => {
//   console.log(restaurentId);
//   const restaurent = await Restaurent.findByIdAndUpdate(restaurentId, { ...updateBody }, { new: true });
//   if (!restaurent) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Restaurent is invalid');
//   }
//   return restaurent;
// };

const deleteRestaurent = async (restaurentId) => {
  const restaurent = await Restaurent.findByIdAndUpdate(restaurentId, { deleted: true });
  if (!restaurent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurent is invalid');
  }
  return restaurent;
};

module.exports = {
  createRestaurent,
  getRestaurent,
  deleteRestaurent,
  getAllRestaurent
};
