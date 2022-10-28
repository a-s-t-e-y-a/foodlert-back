require('express-async-errors');
const taskModel = require('./../models/task.model');

const createTask = async ({
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
  createdBy
}) => {
  const createdTask = await taskModel.create({
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
    createdBy
  });

  return createdTask;
};

const getAllTask = async ({ createdBy }) => {
  const getAllTask = await taskModel.find({ createdBy }).populate('createdBy');

  return getAllTask;
};
const getTask = async ({ id }) => {
  const getAllTask = await taskModel.findById(id).populate('createdBy');

  return getAllTask;
};
const updateTask = async ({ id, body }) => {
  const getAllTask = await taskModel.findByIdAndUpdate(id, body, { new: true });

  return getAllTask;
};

const deleteTask = async ({ id }) => {
  await taskModel.findByIdAndDelete(id);
};
module.exports = {
  createTask,
  getAllTask,
  getTask,
  updateTask,
  deleteTask
};
