const { ObjectId } = require('mongoose').Types;
// require('express-async-errors');

const Department = require('../models/department.model');

const createDepartment = async (name, branchId) => {
  const department = await Department.create({ name, branch: branchId });
  return department;
};

const getDepartmentes = async (branchId) => {
  const departmentes = await Department.find({ branch: branchId });
  return departmentes;
};

const deleteDepartment = async (departmentId, branchId) => {
  // console.log(departmentId, branchId);
  const department = await Department.deleteOne({ _id: new ObjectId(departmentId), branch: branchId });
  return department;
};

module.exports = {
  createDepartment,
  getDepartmentes,
  deleteDepartment
};
