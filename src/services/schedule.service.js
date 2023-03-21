const { ObjectId } = require('mongoose').Types;
require('express-async-errors');

const Schedule = require('../models/schedule.model');

const createSchedule = async (scheduleBody) => {
  // console.log(scheduleBody)
  const schedule = await Schedule.create(scheduleBody);
  return schedule;
};

const getScheduleById = async (scheduleId, restaurentId) => {
  const schedule = await Schedule.find({ _id: new ObjectId(scheduleId), restaurent: restaurentId });
  return schedule;
};

const getScheudlesByWeek = async (weekStartDate, weekEndDate, branchId, restaurentId) => {
  const pipelineQuery = [
    {
      $match: {
        date: { $gte: weekStartDate, $lte: weekEndDate },
        branch: new ObjectId(branchId)
      }
    },
    {
      $group: {
        _id: '$employee',
        schedule: {
          // $push: '$$ROOT'
          $push: {
            _id: '$_id',
            workingTime: '$workingTime',
            breakTime: '$breakTime',
            date: '$date',
            date: '$date',
            inDraft: '$inDraft',
            leaveType: '$leaveType'
          }
        }
      }
    }

    // {
    //   $lookup: {
    //     from: 'employees',
    //     localField: '_id',
    //     foreignField: '_id',
    //     as: 'emp'
    //   }
    // }
  ];
  const schedules = await Schedule.aggregate(pipelineQuery); // need to complete
  return schedules;
};

const publishSchedule = async (branchId) => {
  return await Schedule.updateMany({ branch: branchId }, { inDraft: false }).lean();
};

const deleteSchedule = async (scheduleId) => {
  console.log(scheduleId)
  const schedule = await Schedule.findOneAndDelete({ _id: scheduleId });
  console.log(schedule)
  return schedule;
  
};

module.exports = {
  createSchedule,
  publishSchedule,
  getScheduleById,
  getScheudlesByWeek,
  deleteSchedule
};
