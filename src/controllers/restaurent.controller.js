const httpStatus = require('http-status');
require('express-async-errors');

const restranValidation = require('../validations/restaurent.validation');

const restaurentService = require('../services/restaurent.service');
const userService = require('../services/user.service');
const authService = require('../services/auth.service');
const Branch = require('../models/branch.model');

const createRestaurent = async (req, res, next) => {
  const { businessName, fullName, phoneNumber, email, password } = req.body;

  const user = await userService.createUser(fullName, phoneNumber, email, password, 'owner');

  const restaurent = await restaurentService.createRestaurent(businessName, user.id);

  const branch = await Branch.create({
    name: businessName,
    isMainBranch: true,
    manager: user.id,
    restaurent: restaurent.id
  });

  user.restaurent = restaurent.id;
  user.branch = branch.id;
  await user.save();

  const token = await authService.sendOtp(user);
  res.status(httpStatus.CREATED).json({ branch, user, token });
};

const getRestaurent = async (req, res, next) => {
  const { restaurentId } = req.params;
  const restaurent = await restaurentService.getRestaurent(restaurentId);
  res.json({ restaurent });
};

const getAllRestaurent = async (req, res, next) => {
  const restaurent = await restaurentService.getAllRestaurent();
  res.json({ restaurent });
};

// const updateRestaurent = async (req, res, next) => {

//   const { restaurentId } = req.params;
//   // const {
//   //   fullName,
//   //   phoneNumber,
//   //   email,
//   //   dob,
//   //   password,
//   //   bankName,
//   //   bankAccount,
//   //   currency,
//   //   venueName,
//   //   location,
//   //   timeFormat,
//   //   timeZone,
//   //   payroll,
//   //   cashAmount,
//   //   safeAmount,
//   //   closingAmount,
//   //   notification
//   // } = req.body;

//   const restaurent = await restaurentService.updateRestaurent(restaurentId, req.body);
//   await Branch.findOneAndUpdate(
//     { restaurent: restaurent.id, isMainBranch: true },
//     { name: req.body.venueName, address: req.body.location }
//   );
//   res.json({ restaurent });
// };

const deleteRestaurent = async (req, res, next) => {
  const { restaurentId } = req.params;

  await restaurentService.deleteRestaurent(restaurentId);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  createRestaurent,
  getRestaurent,
  deleteRestaurent,
  getAllRestaurent
};
