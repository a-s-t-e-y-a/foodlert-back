const httpStatus = require('http-status');
const { ObjectId } = require('mongoose').Types;
require('express-async-errors');

const ApiError = require('../utils/ApiError');
const PayrollGroup = require('../models/payrollGroup.model');

const createPayrollGroup = async (payrollBody) => {
  const payrollGroup = await PayrollGroup.create(payrollBody);

  return payrollGroup;
};

const getPayrollGroups = async (restaurentId) => {
  const payrollGroup = await PayrollGroup.find({ restaurent: restaurentId });
  return payrollGroup;
};

const getPayrollGroup = async (payrollGroupId, restaurentId) => {
  const payrollGroup = await PayrollGroup.find({ _id: new ObjectId(payrollGroupId), restaurent: restaurentId });
  return payrollGroup;
};

const updatePayrollGroup = async (payrollGroupId, updateBody, restaurentId) => {
  const payrollGroup = await PayrollGroup.findOneAndUpdate(
    { _id: new ObjectId(payrollGroupId), restaurent: restaurentId },
    { ...updateBody },
    { new: true }
  );
  if (!payrollGroup) {
    throw new ApiError(httpStatus.NOT_FOUND, 'PayrollGroup is invalid');
  }
  return payrollGroup;
};

const deletePayrollGroup = async (payrollGroupId, restaurentId) => {
  const payrollGroup = await PayrollGroup.findOneAndDelete(
    { _id: new ObjectId(payrollGroupId), restaurent: restaurentId },
    { deleted: true }
  );
  return payrollGroup;
};

module.exports = {
  createPayrollGroup,
  getPayrollGroup,
  getPayrollGroups,
  updatePayrollGroup,
  deletePayrollGroup
};
