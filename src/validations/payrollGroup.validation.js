const Joi = require('joi');

const { objectId } = require('./custom.validation');

const createPayrollGroup = {
  body: Joi.object({
    name: Joi.string().trim().required(),
    hourly: Joi.number().required(),
    weekday: Joi.number().required(),
    holiday: Joi.number().required(),
    saturday: Joi.number().required(),
    sunday: Joi.number().required()
  })
};

const getPayrollGroup = {
  params: Joi.object({ payrollGroupId: Joi.string().custom(objectId).required() })
};

const getPayrollGroups = {
  query: Joi.object({})
};

const updatePayrollGroup = {
  params: Joi.object({ payrollGroupId: Joi.string().custom(objectId).required() }),
  body: Joi.object({
    name: Joi.string().trim(),
    hourly: Joi.number(),
    weekday: Joi.number(),
    holiday: Joi.number(),
    saturday: Joi.number(),
    sunday: Joi.number()
  })
};

const deletePayrollGroup = {
  params: Joi.object({ payrollGroupId: Joi.string().custom(objectId).required() })
};

module.exports = {
  createPayrollGroup,
  getPayrollGroup,
  getPayrollGroups,
  updatePayrollGroup,
  deletePayrollGroup
};
