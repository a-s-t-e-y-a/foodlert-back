const httpStatus = require('http-status');
require('express-async-errors');

const employeeValidation = require('../validations/employee.validation');

const employeeService = require('../services/employee.service');
const userService = require('../services/user.service');
const User = require('../models/user.model');

const createEmployee = async (req, res, next) => {
  const {
    fullName,
    dob,
    gender,
    phoneNumber,
    email,
    fullAddress,
    branch,
    department,
    jobTitle,
    employementType,
    tenure,
    visa,
    payrollGroup,
    workSlot,
    emergencyContact,
    experience
  } = req.body;

  const restaurentId = req.user.restaurent;
  // const branchId = req.user.branch.id;

  let avatar, resume, companyLogo;

  const userData = {
    fullName,
    dob,
    phoneNumber,
    email,
    type: 'employee',
    branch,
    avatar,
    restaurent: restaurentId
  };

  const employeeData = {
    gender,
    fullAddress,
    department,
    jobTitle,
    employementType,
    tenure,
    visa,
    payrollGroup,
    workSlot,
    emergencyContact,
    experience,
    resume,
    branch,
    restaurent: restaurentId
  };

  const employee = await employeeService.createEmployee(userData, employeeData, restaurentId);
  res.status(httpStatus.CREATED).json({ employee });
};

const getEmployee = async (req, res, next) => {
  const { employeeId } = req.params;
  const restaurentId = req.user.restaurent;
  const employee = await employeeService.getEmployee(employeeId, restaurentId);
  res.json({ employee });
};

const getEmployees = async (req, res, next) => {
  const { role } = req.query;
  let query = {};
  if (role) {
    query.role = { $exists: true };
  }
  const restaurentId = req.user.restaurent;
  const branchId = req.user.branch.id;
  console.log(query);
  let employees;
  if (req.user.type === 'owner') {
    query.restaurent = restaurentId;
    employees = await employeeService.getEmployees(query);
  } else if (req.user.type === 'manager') {
    query.branch = branchId;
    employees = await employeeService.getEmployees(query);
  }
  res.json({ employees });
};

const updateEmployee = async (req, res, next) => {
  validateSchema(req, employeeValidation.updateEmployee);

  const { employeeId } = req.params;
  const restaurentId = req.user.restaurent;

  const {
    fullName,
    dob,
    gender,
    phoneNumber,
    email,
    fullAddress,
    branch,
    department,
    jobTitle,
    employementType,
    tenure,
    visa,
    payrollGroup,
    workSlot,
    ip,
    mac,
    emergencyContact,
    experience,
    role,
    access
  } = req.body;

  let avatar, resume, companyLogo, sickCertificate;

  req.files?.forEach((file) => {
    if (file.fieldname === 'avatar') {
      avatar = file.filename;
    } else if (file.fieldname === 'resume') {
      resume = file.filename;
    } else if (file.fieldname === 'companyLogo') {
      companyLogo = file.filename;
    } else if (file.fieldname === 'sickCertificate') {
      sickCertificate = file.filename;
    }
  });

  if (experience) {
    experience.logo = companyLogo;
  }

  const userData = {
    fullName,
    dob,
    phoneNumber,
    email,
    branch,
    avatar
  };

  const employeeData = {
    gender,
    fullAddress,
    department,
    jobTitle,
    employementType,
    tenure,
    visa,
    payrollGroup,
    workSlot,
    branch,
    ip,
    mac,
    emergencyContact,
    experience,
    sickCertificate,
    resume,
    role,
    access
  };

  const employee = await employeeService.updateEmployee(employeeId, userData, employeeData, restaurentId);
  res.json({ employee });
};

const deleteEmployee = async (req, res, next) => {
  validateSchema(req, employeeValidation.deleteEmployee);
  const { employeeId } = req.params;
  const restaurentId = req.user.restaurent.id;
  await employeeService.deleteEmployee(employeeId, restaurentId);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  createEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee
};
