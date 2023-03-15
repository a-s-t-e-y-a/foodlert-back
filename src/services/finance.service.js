                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       const { ObjectId } = require("mongoose").Types;
require("express-async-errors");
const financeModel = require("./../models/finance.model");
const getTotalAmount = (costs) => {
  let cents = 0,
    dollars = 0;
  for (key in costs) {
    const cost = parseFloat(costs[key]);
    const quantity = parseFloat(key.slice(0, key.length - 1));

    if (key.includes("c")) cents += quantity * cost;
    else dollars += quantity * cost;
  }

  return dollars + cents / 100.0;
};

const getMissingPos = (totalAmount, platforms) => {
  let underAmount = 0;
  for (key in platforms) {
    underAmount += platforms[key];
  }

  return totalAmount - underAmount;
};

const createFinance = async ({
  type,
  costs,
  registerBy,
  time,
  comment,
  registeredDate,
  method,
  accountNo,
  platforms,
  notes,
}) => {
  const totalAmount = getTotalAmount(costs);
  let missingPOS;
  if (type === "closing-days")
    missingPOS = getMissingPos(totalAmount, platforms);
  console.log(notes);

  const createdFinance = await financeModel.create({
    type,
    costs,
    registerBy,
    registeredDate,
    totalAmount,
    comment,
    time,
    method,
    accountNo,
    platforms,
    notes,
    missingPOS,
  });

  return createdFinance;
};

const getAllFinance = async ({ type,query,timeQueries }) => {
 

  const {time} = query;
  console.log(timeQueries)
 
  
  if(time==="" || time===undefined){
    console.log("length is 0")
    const getAllFinance = await financeModel
    .find({type})
    .populate("registerBy");
    return getAllFinance;
  }
  else{
    console.log("length is 1")
    const getAllFinance = await financeModel
  .find({time:{$in:timeQueries}})
  .populate("registerBy");
  return getAllFinance;
  }
 
  
};
const changeFinanceStatus = async ({ id, body }) => {
  const getAllFinance = await financeModel.findByIdAndUpdate(id, body, {
    new: true,
  });

  return getAllFinance;
};

const deleteAllFinance = async () => {
  await financeModel.deleteMany();
};
module.exports = {
  createFinance,
  getAllFinance,
  changeFinanceStatus,
  deleteAllFinance,
};
