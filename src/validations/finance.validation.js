const Joi = require("joi");

const { objectId } = require("./custom.validation");

const validKeysInCosts = {
  "5c": Joi.number(),
  "10c": Joi.number(),
  "20c": Joi.number(),
  "50c": Joi.number(),
  "1$": Joi.number(),
  "2$": Joi.number(),
  "5$": Joi.number(),
  "10$": Joi.number(),
  "20$": Joi.number(),
  "50$": Joi.number(),
  "100$": Joi.number(),
};
const validPlatforms = {
  cash: Joi.number(),
  eftpos: Joi.number(),
  deliveroo: Joi.number(),
  uber: Joi.number(),
  menuLog: Joi.number(),
  doorDash: Joi.number(),
  orderUp: Joi.number(),
};
const createFinanceCashRegister = {
  body: Joi.object({
    type: Joi.string().trim().lowercase().valid("cash-register").required(),
    costs: Joi.object().keys(validKeysInCosts).required(),
    time: Joi.string()
      .lowercase()
      .valid("breakfast", "lunch", "dinner", "night"),
    registerBy: Joi.string().custom(objectId),
    totalAmount: Joi.number(),
    status: Joi.string().lowercase().valid("approved", "pending", "cancelled"),
  }),
};

const createFinanceSafeDeposit = {
  body: Joi.object({
    type: Joi.string().trim().lowercase().valid("safe-deposit").required(),
    costs: Joi.object().keys(validKeysInCosts).required(),
    registerBy: Joi.string().custom(objectId),
    totalAmount: Joi.number(),
    comment: Joi.string().trim(),
    status: Joi.string().lowercase().valid("approved", "pending", "cancelled"),
  }),
};

const createTransfer = {
  body: Joi.object({
    type: Joi.string().trim().lowercase().valid("transfer").required(),
    costs: Joi.object().keys(validKeysInCosts).required(),
    registerBy: Joi.string().custom(objectId),
    totalAmount: Joi.number(),
    comment: Joi.string().trim(),
    accountNo: Joi.number(),
    method: Joi.string()
      .lowercase()
      .valid("cash on hand", "bank deposit")
      .required(),
    status: Joi.string().lowercase().valid("approved", "pending", "cancelled"),
  }),
};

const createClosingDays = {
  body: Joi.object({
    type: Joi.string().trim().lowercase().valid("closing-days").required(),
    costs: Joi.object().keys(validKeysInCosts).required(),
    platforms: Joi.object().keys(validPlatforms).required(),
    registerBy: Joi.string().custom(objectId),
    totalAmount: Joi.number(),
    missingPOS: Joi.number(),
    notes: Joi.string().trim(),
  }),
};

const changeFinanceStatus = {
  body: Joi.object({
    status: Joi.string()
      .lowercase()
      .valid("pending", "approved", "cancelled")
      .required(),
  }),
};

module.exports = {
  createFinanceCashRegister,
  createFinanceSafeDeposit,
  createTransfer,
  createClosingDays,
  changeFinanceStatus,
};
