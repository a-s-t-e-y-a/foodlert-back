const httpStatus = require('http-status');
const validateSchema = require('./../validations/schema.validation');
const ApiError = require('./../utils/ApiError');
require('express-async-errors');

const financeValidation = require('../validations/finance.validation');

const financeService = require('../services/finance.service');

const getValidator = (type) => {
  const { createFinanceCashRegister, createFinanceSafeDeposit, createTransfer, createClosingDays } = financeValidation;
  switch (type) {
    case 'cash-register':
      return createFinanceCashRegister;
    case 'safe-deposit':
      return createFinanceSafeDeposit;
    case 'transfer':
      return createTransfer;
    case 'closing-days':
      return createClosingDays;

    default:
      return null;
  }
};

const getType = (req) => {
  return req.originalUrl.split('/')[3];
};

const createFinance = async (req, res, next) => {
  const type = getType(req);
  req.body.type = type;

  const validator = getValidator(type);
  console.log(type, req.originalUrl);
  const err = validateSchema(req, validator);
  if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const { costs, registerBy, totalAmount, time, comment, registeredDate, method, accountNo, platforms } = req.body;

  const createdFinance = await financeService.createFinance({
    type,
    costs,
    registeredDate,
    registerBy,
    totalAmount,
    time,
    comment,
    method,
    accountNo,
    platforms
  });
  res.status(httpStatus.CREATED).send({ createdFinance });
};

const getAllFinance = async (req, res, next) => {
  const type = getType(req);
  console.log('type', type);
  const getAllFinance = await financeService.getAllFinance({ type });
  res.status(httpStatus.CREATED).send({ totalFinance: getAllFinance.length, getAllFinance });
};

const changeFinanceStatus = async (req, res, next) => {
  const err = validateSchema(req, financeValidation.changeFinanceStatus);
  if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const id = req.params.id;

  const updatedfinance = await financeService.changeFinanceStatus({ id, body: req.body });
  res.status(httpStatus.CREATED).send({ updatedfinance });
};

const deleteAllFinance = async (req, res, next) => {
  await financeService.deleteAllFinance();
  res.status(httpStatus.CREATED).send({});
};

module.exports = { createFinance, getAllFinance, changeFinanceStatus, deleteAllFinance };
