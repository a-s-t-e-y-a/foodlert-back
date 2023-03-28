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

const getAllTask = async ({ createdBy,query="" }) => {
  const {status,department,task,no_of_checklist} = query;
 if(status=="" && department=="" && task=="" && no_of_checklist=="" ){
   console.log("status-->",status)
  console.log("department-->",department)
  console.log("task-->",task)
  console.log("no_of_checklist-->",no_of_checklist)
  console.log("NO ONE")
  let getAllTask = await taskModel.find({ createdBy }).populate("createdBy");
  return getAllTask;
 }
 else if(status!=="" && department!=="" && task!=="" && no_of_checklist!=="" ){
  console.log("status-->",status)
  console.log("department-->",department)
  console.log("task-->",task)
  console.log("no_of_checklist-->",no_of_checklist)
  console.log("EVERY ONE")
  const taskStatus = status.split(",")
  const taskDepartment = department.split(",")
  const taskTask = task.split(",")
  const unit = no_of_checklist.split(",")
  let getAllTask = await taskModel.find({ createdBy,status:{$in:taskStatus},assignTo:{$in:taskDepartment},repeat:{$in:taskTask},checklists:{$elemMatch:{"unit":{$in:unit}}} }).populate("createdBy");
  return getAllTask;
 }
 else if(status=="" || department=="" || task=="" || no_of_checklist=="" ){
  console.log("status-->",status)
  console.log("department-->",department)
  console.log("task-->",task)
  console.log("no_of_checklist-->",no_of_checklist)
  console.log("ANY ONE")

  const taskStatus = status.split(",")
  const taskDepartment = department.split(",")
  const taskTask = task.split(",")
  const unit = no_of_checklist.split(",")

  if(status=="" && department=="" && task=="" && no_of_checklist==""){
    console.log("nothing is given")
    let getAllTask = await taskModel.find({ createdBy}).populate("createdBy");
    return getAllTask;
  }
  else if(status=="" && department=="" && task==""){
    console.log("no of checklist is given")
    let getAllTask = await taskModel.find({ createdBy, checklists:{$elemMatch:{"unit":{$in:unit}}} }).populate("createdBy");
    return getAllTask;
  }
  else if(status=="" && task=="" && no_of_checklist==""){
    console.log("department is given")
    let getAllTask = await taskModel.find({ createdBy,assignTo:{$in:taskDepartment} }).populate("createdBy");
    return getAllTask;

  }
  else if(status=="" && department=="" && no_of_checklist==""){
    console.log("task is given")
    let getAllTask = await taskModel.find({ createdBy,repeat:{$in:taskTask}}).populate("createdBy");
    return getAllTask;
  }
  else if(department=="" && task=="" && no_of_checklist==""){
    // console.log("status is given")
    console.log("status is given")
    let getAllTask = await taskModel.find({ createdBy,status:{$in:taskStatus}}).populate("createdBy");
    return getAllTask;
  }
  else if(status=="" && task==""){
    console.log("status and is not given")
    let getAllTask = await taskModel.find({ createdBy,assignTo:{$in:taskDepartment},checklists:{$elemMatch:{"unit":{$in:unit}}} }).populate("createdBy");
    return getAllTask;

  }else if(department=="" && task==""){
    console.log("department and task is not given")
    let getAllTask = await taskModel.find({ createdBy,status:{$in:taskStatus},checklists:{$elemMatch:{"unit":{$in:unit}}}}).populate("createdBy");
    return getAllTask;

  }
  else if(task=="" && no_of_checklist==""){
    console.log("task and checklist is not given")
    console.log(taskStatus)
    console.log(taskDepartment)
    let getAllTask = await taskModel.find({ createdBy,status:{$in:taskStatus},assignTo:{$in:taskDepartment}}).populate("createdBy");
    return getAllTask;
  }
  else if(status=="" && department==""){
    console.log("task and checklist is not given")
    let getAllTask = await taskModel.find({ createdBy,repeat:{$in:taskTask},checklists:{$elemMatch:{"unit":{$in:unit}}}}).populate("createdBy");
    return getAllTask;

  }
  else if(status=="" && no_of_checklist==""){
    console.log("department and task is not given")
    let getAllTask = await taskModel.find({ createdBy,repeat:{$in:taskTask},assignTo:{$in:taskDepartment}}).populate("createdBy");
    return getAllTask;
  }
  else if(department==""){
    console.log("only department is not given")
    let getAllTask = await taskModel.find({ createdBy,status:{$in:taskStatus},repeat:{$in:taskTask},checklists:{$elemMatch:{"unit":{$in:unit}}}}).populate("createdBy");
    return getAllTask;
  }
  else if(status==""){
    console.log("only status is not given")
    let getAllTask = await taskModel.find({ createdBy,assignTo:{$in:taskDepartment},repeat:{$in:taskTask},checklists:{$elemMatch:{"unit":{$in:unit}}}}).populate("createdBy");
    return getAllTask;
  }
  else if(task==""){
    console.log("only task is not given")
    let getAllTask = await taskModel.find({ createdBy,status:{$in:taskStatus},assignTo:{$in:taskDepartment},checklists:{$elemMatch:{"unit":{$in:unit}}}}).populate("createdBy");
    return getAllTask;
  }
  else if(no_of_checklist==""){
    console.log("only checklist is not given")
    let getAllTask = await taskModel.find({ createdBy,status:{$in:taskStatus},assignTo:{$in:taskDepartment},repeat:{$in:taskTask}}).populate("createdBy");
    return getAllTask;
  }
 }
  // checkForCompletion(getAllTask);
  // await updatedTaskToCompleted();
  // getAllTask = await taskModel.find({ createdBy }).populate("createdBy");
 
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
