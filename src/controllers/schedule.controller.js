const httpStatus = require('http-status');
const { ObjectId } = require('mongoose').Types;
const dayjs = require('dayjs');
require('express-async-errors');

const scheduleController = require('../validations/schedule.validation');

const scheduleService = require('../services/schedule.service');
const Employee = require('../models/employee.model');

const createSchedule = async (req, res, next) => {
  const restaurentId = req.user.restaurent;
  const branchId = req.user.branch.id;

  const { workingTime, breakTime, date, leaveType, inDraft, employee } = req.body;

  const newSchedule = {
    workingTime,
    breakTime,
    date,
    leaveType,
    inDraft,
    employee,
    restaurent: restaurentId,
    branch: branchId
  };
  console.log(newSchedule);

  const schedule = await scheduleService.createSchedule(newSchedule);
  res.status(httpStatus.CREATED).json({ schedule });
};

const getSchedules = async (req, res, next) => {
  const restaurentId = req.user.restaurent;
  const branchId = req.user.branch.id;
  const { date } = req.query;

  const allEmployee = await Employee.find({ branch: new ObjectId(branchId) }, 'department jobTitle workSlot')
    .populate({
      path: 'user',
      select: ['fullName', 'email', 'avatar']
    })
    .lean();

  const weekStartDate = dayjs(date).day(0).toDate();
  const weekEndDate = dayjs(date).day(6).toDate();
  const employeeSchedule = await scheduleService.getScheudlesByWeek(weekStartDate, weekEndDate, branchId, restaurentId); // grouped by employeeId

  const schedules = allEmployee.map((emp) => {
    const scheduledoc = employeeSchedule.find((sch) => sch._id.toString() == emp._id.toString());
    return { ...emp, schedule: scheduledoc ? scheduledoc.schedule : [] };
  });

  res.json({ employees: schedules });
};

const deleteSchedule = async (req, res, next) => {
  const { scheduleId } = req.params;
  const branchId = req.user.branch.id;
  const Schedule = await scheduleService.deleteSchedule(scheduleId, branchId);
  res.status(httpStatus.NO_CONTENT).send();
};

const publishSchedule = async (req, res, next) => {
  const branchId = req.user.branch.id;
  const Schedule = await scheduleService.publishSchedule(branchId);
  res.send({ message: 'Schedule published' });
};

module.exports = {
  createSchedule,
  publishSchedule,
  getSchedules,
  deleteSchedule
};
