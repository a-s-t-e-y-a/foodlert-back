const { ObjectId } = require('mongoose').Types;
require('express-async-errors');

const Role = require('../models/role.model');

const createRole = async (name, branchId) => {
  const role = await Role.create({ name, branch: branchId });
  return role;
};

const getRoles = async (branchId) => {
  const roles = await Role.find({ branch: branchId });
  return roles;
};

const deleteRole = async (roleId, branchId) => {
  const role = await Role.deleteOne({ _id: new ObjectId(roleId), branch: branchId });
  return role;
};

module.exports = {
  createRole,
  getRoles,
  deleteRole
};
