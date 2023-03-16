const httpStatus = require("http-status");
const validateSchema = require("./../validations/schema.validation");
const ApiError = require("./../utils/ApiError");
require("express-async-errors");

const financeValidation = require("../validations/finance.validation");

const financeService = require("../services/finance.service");

const getValidator = (type) => {
  const {
    createFinanceCashRegister,
    createFinanceSafeDeposit,
    createTransfer,
    createClosingDays,
  } = financeValidation;
  switch (type) {
    case "cash-register":
      return createFinanceCashRegister;
    case "safe-deposit":
      return createFinanceSafeDeposit;
    case "transfer":
      return createTransfer;
    case "closing-days":
      return createClosingDays;

    default:
      return null;
  }
};

const getType = (req) => {
  return req.originalUrl.split("/")[3];
};

const createFinance = async (req, res, next) => {
  const type = getType(req);
  req.body.type = type;

  const validator = getValidator(type);
  console.log(type, req.originalUrl);
  // const err = validateSchema(req, validator);
  // if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const {
    costs,
    totalAmount,
    time,
    comment,
    registeredDate,
    method,
    accountNo,
    platforms,
    notes,
  } = req.body;

  const registerBy = req.user.id;

  console.log(notes);

  const createdFinance = await financeService.createFinance({
    type,
    costs,
    registeredDate,
    totalAmount,
    time,
    comment,
    method,
    accountNo,
    platforms,
    registerBy,
    notes,
  });
  res.status(httpStatus.CREATED).send({ createdFinance });
};

const getAllFinance = async (req, res, next) => {
  const type = getType(req);
  const query = req.query;

  const typeOfUrl = type.split("?")
  const url = typeOfUrl[0]
  console.log(url)
  

   if(url==='cash-register'){
    if(query.time!=undefined && query.time!=""){
      let timeQueries = req.query.time.split(",")
      console.log("tieeee-->",timeQueries)
    
      const getAllFinance = await financeService.getAllFinance({ url , query,timeQueries});
      res.status(httpStatus.CREATED)
        .send({ totalFinance: getAllFinance.length, getAllFinance,query });
    }
      else{
        const getAllFinance = await financeService.getAllFinance({ url , query});
      res.status(httpStatus.CREATED)
        .send({ totalFinance: getAllFinance.length, getAllFinance,query });
      }
   }
   else if(url==='safe-deposit'){
    const date = req.query.date;
    console.log(date)
   if(date===undefined || date===""){
    const getAllFinance = await financeService.getAllFinance({ url , query});
    res.status(httpStatus.CREATED)
      .send({ totalFinance: getAllFinance.length, getAllFinance,query });
 }
 else{
  console.log("date hai")
  const getAllFinance = await financeService.getAllFinance({ url , query,date});
  res.status(httpStatus.CREATED)
    .send({ totalFinance: getAllFinance.length, getAllFinance,query });
 }
   }
   else if(url==="transfer"){
    const {paymentMethod,status} = query
    console.log(paymentMethod,status)
   if(paymentMethod==="" && status ===""){
    const getAllFinance = await financeService.getAllFinance({ url });
    res.status(httpStatus.CREATED)
      .send({ totalFinance: getAllFinance.length, getAllFinance,query });
     }

     else if(paymentMethod!=="" && status!==""){
      //logic i will give here array logic
      const getAllFinance = await financeService.getAllFinance({ url,paymentMethod,status });
      res.status(httpStatus.CREATED)
        .send({ totalFinance: getAllFinance.length, getAllFinance,query });
       }

     else if(paymentMethod==="" || status===""){

      //or logic i will give here 
      const getAllFinance = await financeService.getAllFinance({ url,paymentMethod,status });
       res.status(httpStatus.CREATED)
      .send({ totalFinance: getAllFinance.length, getAllFinance,query });
     }
     
       
    
     }
   };

const changeFinanceStatus = async (req, res, next) => {
  const err = validateSchema(req, financeValidation.changeFinanceStatus);
  if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const id = req.params.id;

  const updatedfinance = await financeService.changeFinanceStatus({
    id,
    body: req.body,
  });
  res.status(httpStatus.CREATED).send({ updatedfinance });
};

const deleteAllFinance = async (req, res, next) => {
  await financeService.deleteAllFinance();
  res.status(httpStatus.CREATED).send({});
};

module.exports = {
  createFinance,
  getAllFinance,
  changeFinanceStatus,
  deleteAllFinance,
};
