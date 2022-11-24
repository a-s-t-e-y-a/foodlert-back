require("express-async-errors");
const taskModel = require("./../models/task.model");

const compltedTaskLists = [];

const checkForCompletion = (tasks) => {
  tasks.forEach((task) => {
    let checkListLength = task.checklists.length;
    console.log(checkListLength);
    task.checklists.forEach((checklist) => {
      console.log(checklist.status);
      if (checklist.status === "completed") checkListLength--;
    });
    if (!checkListLength) compltedTaskLists.push(task.id);
  });
};

const updatedTaskToCompleted = async () => {
  console.log(compltedTaskLists);
  for await (const taskId of compltedTaskLists) {
    await updateTask({ id: taskId, body: { status: "completed" } });
  }
};

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
  createdBy,
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
    createdBy,
  });

  return createdTask;
};

const getAllTask = async ({ createdBy }) => {
  let getAllTask = await taskModel.find({ createdBy }).populate("createdBy");
  // checkForCompletion(getAllTask);
  // await updatedTaskToCompleted();
  getAllTask = await taskModel.find({ createdBy }).populate("createdBy");
  return getAllTask;
};
const getTask = async ({ id }) => {
  const getAllTask = await taskModel.findById(id).populate("createdBy");

  return getAllTask;
};
const updateTask = async ({ id, body }) => {
  const getUpdatedTask = await taskModel.findByIdAndUpdate(id, body, {
    new: true,
  });
  console.log(getUpdatedTask);
  return getUpdatedTask;
};

const deleteTask = async ({ id }) => {
  await taskModel.findByIdAndDelete(id);
};
module.exports = {
  createTask,
  getAllTask,
  getTask,
  updateTask,
  deleteTask,
};
