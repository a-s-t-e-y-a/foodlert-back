const httpStatus = require('http-status');
require('express-async-errors');

const roleValidation = require('../validations/role.validation');

const roleService = require('../services/role.service');

const createRole = async (req, res, next) => {
  const { name } = req.body;

  const branchId = req.user.branch.id;
  const role = await roleService.createRole(name, branchId);
  res.status(httpStatus.CREATED).send({ role });
};

const getRoles = async (req, res, next) => {
  const branchId = req.user.branch.id;
  const roles = await roleService.getRoles(branchId);
  res.json({ roles });
};

const deleteRole = async (req, res, next) => {
  const { roleId } = req.params;
  const branchId = req.user.branch.id;
  const Role = await roleService.deleteRole(roleId, branchId);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  createRole,
  getRoles,
  deleteRole
};
