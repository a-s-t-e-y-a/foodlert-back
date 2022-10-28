const httpStatus = require('http-status');
require('express-async-errors');

const branchValidation = require('../validations/branch.validation');

const branchService = require('../services/branch.service');
const Branch = require('../models/branch.model');

const createBranch = async (req, res, next) => {
  const { name, address } = req.body;
  let manager = req.user.id;

  const restaurentId = req.user.restaurent;

  const branch = await branchService.createBranch({ name, manager, address, restaurent: restaurentId });
  res.status(httpStatus.CREATED).send({ branch });
};

const getBranches = async (req, res, next) => {
  const restaurentId = req.user.restaurent;
  const branches = await branchService.getBranches(restaurentId);
  res.send({ branches });
};

const getBranch = async (req, res, next) => {
  const { branchId } = req.params;
  const restaurentId = req.user.restaurent;
  const branch = await branchService.getBranch(branchId, restaurentId);
  res.send({ branch });
};

const updateBranch = async (req, res, next) => {
  const { branchId } = req.params;
  const restaurentId = req.user.restaurent;

  // const {
  //   name,
  //   manager,
  //   address,
  //   bankName,
  //   bankAccount,
  //   currency,
  //   businessName,
  //   timeFormat,
  //   timeZone,
  //   payrollType,
  //   cashAmount,
  //   safeAmount,
  //   closingAmount,
  //   notification
  // } = req.body;

  let branch = await branchService.updateBranch(branchId, req.body, restaurentId);

  res.json({ branch });
};

const deleteBranch = async (req, res, next) => {
  const { branchId } = req.params;
  const restaurentId = req.user.restaurent;
  const branch = await branchService.deleteBranch(branchId, restaurentId);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  createBranch,
  getBranches,
  getBranch,
  updateBranch,
  deleteBranch
};
