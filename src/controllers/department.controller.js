const departValidation = require('../validations/department.validation');

const departService = require('../services/department.service');

const createDepartment = async (req, res, next) => {
  const { name } = req.body;

  const branchId = req.user.branch.id;
  const department = await departService.createDepartment(name, branchId);
  res.status(httpStatus.CREATED).send({ department });
};

const getDepartmentes = async (req, res, next) => {
  console.log('tttttttttt', req.user);
  const branchId = req.user.branch.id;
  const departments = await departService.getDepartmentes(branchId);
  res.json({ departments });
};

const deleteDepartment = async (req, res, next) => {
  const { departmentId } = req.params;
  const branchId = req.user.branch.id;
  const department = await departService.deleteDepartment(departmentId, branchId);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  createDepartment,
  getDepartmentes,
  deleteDepartment
};
