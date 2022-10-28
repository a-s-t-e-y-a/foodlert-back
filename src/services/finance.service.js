const { ObjectId } = require('mongoose').Types;
require('express-async-errors');
const financeModel = require('./../models/finance.model');
const getTotalAmount = (costs) => {
  let cents = 0,
    dollars = 0;
  for (key in costs) {
    const cost = parseFloat(costs[key]);
    const quantity = parseFloat(key.slice(0, key.length - 1));

    if (key.includes('c')) cents += quantity * cost;
    else dollars += quantity * cost;
  }

  return dollars + cents / 100.0;
};
const createFinance = async ({ type, costs, registerBy, time, comment, registeredDate, method, accountNo, platforms }) => {
  const totalAmount = getTotalAmount(costs);

  const createdFinance = await financeModel.create({
    type,
    costs,
    registerBy: new ObjectId(registerBy),
    registeredDate,
    totalAmount,
    comment,
    time,
    method,
    accountNo,
    platforms
  });

  return createdFinance;
};

const getAllFinance = async ({ type }) => {
  const getAllFinance = await financeModel.find({ type });

  return getAllFinance;
};
const changeFinanceStatus = async ({ id, body }) => {
  const getAllFinance = await financeModel.findByIdAndUpdate(id, body, { new: true });

  return getAllFinance;
};

const deleteAllFinance = async () => {
  await financeModel.deleteMany();
};
module.exports = {
  createFinance,
  getAllFinance,
  changeFinanceStatus,
  deleteAllFinance
};
