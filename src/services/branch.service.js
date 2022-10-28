const httpStatus = require('http-status');
const { ObjectId } = require('mongoose').Types;
require('express-async-errors');

const ApiError = require('../utils/ApiError');
const Branch = require('../models/branch.model');
const User = require('../models/user.model');

const createBranch = async (branchData) => {
  let branch = await Branch.create({ ...branchData });
  const user = await User.findById(branchData.manager);
  if (user.type !== 'owner') {
    user.type = 'manager';
    await user.save();
  }
  branch = branch.populate('manager');
  return branch;
};

const getBranch = async (branchId, restaurentId) => {
  let branch = await Branch.findOne({ _id: new ObjectId(branchId), restaurent: restaurentId }).populate('manager');

  return branch;
};

const getBranches = async (restaurentId) => {
  const branches = await Branch.find({ restaurent: restaurentId, deleted: false }).populate('manager');
  return branches;
};

const updateBranch = async (branchId, updateBody, restaurentId) => {
  const branch = await Branch.findOneAndUpdate(
    { _id: new ObjectId(branchId), restaurent: restaurentId },
    { ...updateBody },
    { new: true }
  ).populate('manager');

  if (!branch) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid branch id');
  }
  return branch;
};

const deleteBranch = async (branchId, restaurentId) => {
  const branch = await Branch.findOneAndUpdate({ _id: new ObjectId(branchId), restaurent: restaurentId }, { deleted: true });
  const user = await User.findById(branch.manager);
  if (user.type !== 'owner') {
    user.type = 'employee';
    await user.save();
  }
  return branch;
};

module.exports = {
  createBranch,
  getBranch,
  getBranches,
  updateBranch,
  deleteBranch
};
