const Joi = require('joi');
const { objectId } = require('./custom.validation');
const createSubTask = {
  body: Joi.object({
    title: Joi.string().trim().required(),
    time: Joi.string().trim(),
    unit: Joi.string().trim(),
    value: Joi.number(),
    status: Joi.string().trim().valid('open', 'completed', 'cancelled')
  })
};

const updateSubTask = {
  body: Joi.object({
    status: Joi.string().trim().valid('open', 'completed', 'cancelled'),
    log: Joi.string().trim(),
    comment: Joi.string().trim()
  })
};

const deleteSubTask = {
  body: Joi.object({
    id: Joi.string().trim().custom(objectId).required()
  })
};

module.exports = { createSubTask, updateSubTask, deleteSubTask };
