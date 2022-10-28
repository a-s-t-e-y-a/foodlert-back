const Joi = require('joi');

const { objectId } = require('./custom.validation');

const createRole = {
  body: Joi.object({
    name: Joi.string().trim().required(),
  }),
};

const getRoles = {
  query: Joi.object({}),
};

const deleteRole = {
  params: Joi.object({ roleId: Joi.string().custom(objectId).required() }),
};

module.exports = {
  createRole,
  getRoles,
  deleteRole,
};
