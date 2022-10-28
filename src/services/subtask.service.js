const { ObjectId } = require('mongoose').Types;
require('express-async-errors');
const taskModel = require('./../models/task.model');
const ApiError = require('./../utils/ApiError');

const getSubTaskIndex = (subtaskId, task) => {
  let subTaskIndex = -1;
  task.checklists.forEach((subTask, index) => {
    if (subTask._id.equals(subtaskId)) {
      subTaskIndex = index;
    }
  });
  return subTaskIndex;
};

const getUpdateSubTask = (subTask, body) => {
  for (key in body) {
    subTask[key] = body[key];
  }
  return subTask;
};

const createSubTask = async ({ id, title, unit, value, time, status }) => {
  let task = await taskModel.findOne({ id });
  if (!task) throw new ApiError(404, `task not found`);

  task.checklists.push({ id, title, unit, value, time, status });

  const createdSubTask = await task.save();

  return createdSubTask;
};

const updateSubTask = async ({ id, subtaskId, body }) => {
  let task = await taskModel.findOne({ id });
  if (!task) throw new ApiError(404, `task not found`);

  const index = getSubTaskIndex(new ObjectId(subtaskId), task);
  if (index == -1) throw new ApiError(401, `subTask not found`);

  const updatedSubTask = getUpdateSubTask(task.checklists[index], body);
  task.checklists[index] = updatedSubTask;

  const subTaskUpdated = await task.save();
  return subTaskUpdated;
};

const deleteSubTask = async ({ id, subtaskId }) => {
  let task = await taskModel.findOne({ id });
  if (!task) throw new ApiError(404, `task not found`);

  const index = getSubTaskIndex(new ObjectId(subtaskId), task);
  if (index == -1) throw new ApiError(401, `subTask not found`);

  task.checklists.splice(index, 1);

  const taskAfterDeletion = task.save();
  return taskAfterDeletion;
};
module.exports = { createSubTask, updateSubTask, deleteSubTask };
