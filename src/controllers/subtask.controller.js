const httpStatus = require('http-status');
const validateSchema = require('./../validations/schema.validation');
const ApiError = require('./../utils/ApiError');
require('express-async-errors');

const subTaskValidation = require('../validations/subtask.validation');

const subTaskService = require('../services/subtask.service');

const createSubTask = async (req, res, next) => {
  const err = validateSchema(req, subTaskValidation.createSubTask);
  if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const { title, unit, value, time, status } = req.body;

  const createdSubTask = await subTaskService.createSubTask({
    id: req.params.id,
    title,
    unit,
    value,
    time,
    status
  });

  res.status(httpStatus.CREATED).send({ createdSubTask });
};

const getAllSubTask = async (req, res, next) => {
  const getAllSubTask = await subTaskService.getAllSubTask();

  res.status(httpStatus.CREATED).send({ totalTask: getAllSubTask.length, getAllSubTask });
};

const updateSubTask = async (req, res, next) => {
  const err = validateSchema(req, subTaskValidation.updateSubTask);
  if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const id = req.params.id;
  const subtaskId = req.params.subtaskId;

  const updatedSubTask = await subTaskService.updateSubTask({ id, subtaskId, body: req.body });
  res.status(httpStatus.CREATED).send({ updatedSubTask });
};

const deleteSubTask = async (req, res, next) => {
  const id = req.params.id;
  const subtaskId = req.params.subtaskId;

  const remainingSubTasks = await subTaskService.deleteSubTask({ id, subtaskId });
  res.status(httpStatus.CREATED).send({ remainingSubTasks });
};

module.exports = { createSubTask, getAllSubTask, updateSubTask, deleteSubTask };
