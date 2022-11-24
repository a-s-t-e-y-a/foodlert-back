const Joi = require("joi");
const { objectId } = require("./custom.validation");
const createTask = {
  body: Joi.object({
    title: Joi.string().trim().min(1).required(),
    time: Joi.string(),
    comment: Joi.string().trim(),
    checklists: Joi.array(),
    dueDate: Joi.string().trim().required(),
    repeat: Joi.string().valid("day", "week", "month"),
    assignTo: Joi.array().required(),
    status: Joi.string().trim().valid("open", "completed", "cancelled"),
    completedBy: Joi.array(),
    completedDate: Joi.string(),
    createdBy: Joi.string(),
  }),
};

const updateTask = {
  body: Joi.object({
    title: Joi.string().trim(),
    time: Joi.string(),
    comment: Joi.string().trim(),
    checklists: Joi.array(),
    dueDate: Joi.string().trim(),
    repeat: Joi.string().valid("day", "week", "month"),
    assignTo: Joi.array(),
    status: Joi.string().trim().valid("open", "completed", "cancelled"),
    completedBy: Joi.array(),
    completedDate: Joi.string(),
    createdBy: Joi.string(),
  }),
};

const deleteTask = {
  body: Joi.object({
    id: Joi.custom(objectId).required(),
  }),
};

module.exports = { createTask, updateTask, deleteTask };
