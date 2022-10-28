const Joi = require('joi');

const { objectId } = require('./custom.validation');

const createDepartment = {
  body: Joi.object({
    name: Joi.string().trim().required(),
  }),
};

const getDepartments = {
  query: Joi.object({}),
};

const deleteDepartment = {
  params: Joi.object({ departmentId: Joi.string().custom(objectId).required() }),
};

module.exports = {
  createDepartment,
  getDepartments,
  deleteDepartment,
};
