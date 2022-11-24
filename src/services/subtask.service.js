const { ObjectId } = require("mongoose").Types;
require("express-async-errors");
const taskModel = require("./../models/task.model");
const ApiError = require("./../utils/ApiError");

const checkForCompletion = (task) => {
  let checkListLength = task.checklists.length;
  task.checklists.forEach((checklist) => {
    console.log(checklist.status);
    if (checklist.status === "completed") checkListLength--;
  });
  if (checkListLength !== 0) checkListLength--;
  return checkListLength;
};

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

const isNotUserExist = (user, array) => {
  let flag = true;
  array.forEach((existingUser) => {
    if (existingUser.id === user.id) flag = false;
  });
  return flag;
};

const createSubTask = async ({ id, title, unit, value, time, status }) => {
  let task = await taskModel.findOne({ _id: id });
  if (!task) throw new ApiError(404, `task not found`);

  console.log(task);

  task.status = "open";

  task.checklists.push({ id, title, unit, value, time, status });

  const createdSubTask = await task.save();

  return createdSubTask.checklists;
};

const updateSubTask = async ({ id, subtaskId, body, user }) => {
  let task = await taskModel.findOne({ _id: id });
  if (!task) throw new ApiError(404, `task not found`);
  const leftTasks = checkForCompletion(task);

  task.completed_checklists = task.checklists.length - leftTasks;

  if (isNotUserExist(user, task.completedBy)) task.completedBy.push(user);

  const index = getSubTaskIndex(new ObjectId(subtaskId), task);
  if (index == -1) throw new ApiError(401, `subTask not found`);

  if (isNotUserExist(user, task.checklists[index].completedBy))
    task.checklists[index].completedBy.push(user);

  if (leftTasks === 0) {
    task.status = "completed";
    task.completedDate = new Date().toLocaleString();
  }

  task.checklists[index].completedDate = new Date().toLocaleString();

  const updatedSubTask = getUpdateSubTask(task.checklists[index], body);
  task.checklists[index] = updatedSubTask;

  console.log(task);

  const subTaskUpdated = await task.save();
  return subTaskUpdated;
};

const deleteSubTask = async ({ id, subtaskId }) => {
  let task = await taskModel.findOne({ _id: id });
  if (!task) throw new ApiError(404, `task not found`);

  const index = getSubTaskIndex(new ObjectId(subtaskId), task);
  if (index == -1) throw new ApiError(401, `subTask not found`);

  task.checklists.splice(index, 1);

  const taskAfterDeletion = task.save();
  return taskAfterDeletion;
};
module.exports = { createSubTask, updateSubTask, deleteSubTask };
