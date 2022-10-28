const httpStatus = require('http-status');
require('express-async-errors');

const payrollValidation = require('../validations/payrollGroup.validation');

const payrollService = require('../services/payrollgroup.service');

const createPayroll = async (req, res, next) => {
  const { name, hourly, weekday, holiday, saturday, sunday } = req.body;

  const restaurentId = req.user.restaurent;

  const payrollGroup = await payrollService.createPayrollGroup({
    name,
    hourly,
    weekday,
    holiday,
    saturday,
    sunday,
    restaurent: restaurentId
  });

  res.status(httpStatus.CREATED).send({ payrollGroup });
};

const updatePayroll = async (req, res, next) => {
  const { payrollGroupId } = req.params;
  const restaurentId = req.user.restaurent;

  const payrollGroup = await payrollService.updatePayrollGroup(payrollGroupId, req.body, restaurentId);
  res.json({ payrollGroup });
};

const getPayroll = async (req, res, next) => {
  const { payrollGroupId } = req.params;

  const restaurentId = req.user.restaurent;
  const payrollGroup = await payrollService.getPayrollGroup(payrollGroupId, restaurentId);
  res.json({ payrollGroup });
};

const getPayrolls = async (req, res, next) => {
  const restaurentId = req.user.restaurent;
  const payrollGroups = await payrollService.getPayrollGroups(restaurentId);
  res.json({ payrollGroups });
};

const deletePayroll = async (req, res, next) => {
  const { payrollGroupId } = req.params;
  const restaurentId = req.user.restaurent;
  const Payroll = await payrollService.deletePayrollGroup(payrollGroupId, restaurentId);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  createPayroll,
  getPayroll,
  getPayrolls,
  updatePayroll,
  deletePayroll
};
