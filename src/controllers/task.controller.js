const httpStatus = require("http-status");
const validateSchema = require("./../validations/schema.validation");
const ApiError = require("./../utils/ApiError");
require("express-async-errors");

const taskValidation = require("../validations/task.validation");

const taskService = require("../services/task.service");

const createTask = async (req, res, next) => {
  console.log(req.body);
  const err = validateSchema(req, taskValidation.createTask);
  if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const {
    title,
    time,
    comment,
    checklists,
    dueDate,
    repeat,
    assignTo,
    status,
    completedBy,
    completedDate,
  } = req.body;

  const createdBy = req.user.id;

  const createdTask = await taskService.createTask({
    title,
    time,
    comment,
    checklists,
    dueDate,
    repeat,
    assignTo,
    status,
    completedBy,
    completedDate,
    createdBy,
  });
  res.status(httpStatus.CREATED).send({ createdTask });
};

const getAllTask = async (req, res, next) => {
  console.log(req.user);
  const createdBy = req.user.id;
  const getAllTask = await taskService.getAllTask({ createdBy });
  res
    .status(httpStatus.CREATED)
    .send({ totalTask: getAllTask.length, getAllTask });
};

const getTask = async (req, res, next) => {
  const id = req.params.id;
  const getTask = await taskService.getTask({ id });
  res.status(httpStatus.CREATED).send({ getTask });
};

const updateTask = async (req, res, next) => {
  const err = validateSchema(req, taskValidation.updateTask);
  if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const id = req.params.id;

  const updatedTask = await taskService.updateTask({
    id,
    body: req.body,
  });
  res.status(httpStatus.CREATED).send({ updatedTask });
};

const deleteTask = async (req, res, next) => {
  const id = req.params.id;

  await taskService.deleteTask({ id });
  res.status(httpStatus.CREATED).send({});
};

module.exports = { createTask, getAllTask, updateTask, deleteTask, getTask };
