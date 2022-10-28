const Joi = require('joi');

const { objectId } = require('./custom.validation');

const createSchedule = {
  body: Joi.object({
    workingTime: Joi.array().items(Joi.string()).length(2),
    breakTime: Joi.string(),
    date: Joi.date().required(),
    leaveType: Joi.string().valid('Unpaid Leave', 'Annual Leave', 'Sick Leave'),
    inDraft: Joi.boolean().default(true),
    employee: Joi.string().custom(objectId).required()
  })
    .with('workingTime', 'breakTime')
    .xor('workingTime', 'leaveType')
};

const getSchedule = {
  params: Joi.object({ scheduleId: Joi.string().custom(objectId).required() })
};

const getSchedules = {
  query: Joi.object({
    date: Joi.date().required(), // will return data for whole week
    employeeId: Joi.string()
  })
};

const deleteSchedule = {
  params: Joi.object({ scheduleId: Joi.string().custom(objectId).required() })
};

const publishSchedule = {};

module.exports = {
  createSchedule,
  publishSchedule,
  getSchedule,
  getSchedules,
  deleteSchedule
};
