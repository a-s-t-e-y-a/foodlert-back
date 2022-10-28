const { ObjectId } = require('mongoose').Types;
require('express-async-errors');

const Employee = require('../models/employee.model');
const User = require('../models/user.model');
const Restaurent = require('../models/restaurent.model');
const PayrollGroup = require('../models/payrollGroup.model');

const createEmployee = async (userData, employeeData, restaurentId) => {
  const user = await User.create(userData);
  const restaurent = await Restaurent.findById(restaurentId);

  const newEmployeeId = restaurent.lastEmployeeId + 1;
  const newPayrollId = restaurent.lastPayrollId + 1;

  let employee = await Employee.create({
    ...employeeData,
    employeeId: newEmployeeId,
    payrollId: newPayrollId,
    user: user.id
  });

  // employee.user = user;

  await Restaurent.findByIdAndUpdate(restaurentId, { lastEmployeeId: newEmployeeId, lastPayrollId: newPayrollId });
  return employee;
};

const getEmployees = async (query) => {
  let employees = await Employee.find({ ...query })
    .populate('user')
    .populate('branch')
    .populate('payrollGroup');

  return employees;
};

const getEmployee = async (employeeId, restaurentId) => {
  const employee = await Employee.findOne({ _id: new ObjectId(employeeId), restaurent: restaurentId })
    .populate('user')
    .populate('branch')
    .populate('payrollGroup');

  // console.log(story.populated('author'));
  return employee;
};

const updateEmployee = async (employeeId, userData, employeeData, restaurentId) => {
  let employee = await Employee.findOneAndUpdate(
    { _id: new ObjectId(employeeId), restaurent: restaurentId },
    { ...employeeData },
    { new: true }
  );

  console.log(employee);
  await User.findByIdAndUpdate(employee.user, userData);
  employee = await employee.populate('user');
  return employee;
};

const deleteEmployee = async (employeeId, restaurentId) => {
  const employee = await Employee.findOneAndDelete({ _id: new ObjectId(employeeId), restaurent: restaurentId });
  console.log(employee);
  await User.findByIdAndRemove(employee.user);
  return employee;
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee
};
