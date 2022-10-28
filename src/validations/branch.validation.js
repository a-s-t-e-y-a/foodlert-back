const Joi = require('joi');

const { objectId } = require('./custom.validation');

const notificationSchema = Joi.object().pattern(
  Joi.string().valid(
    'Tasks Assign To You',
    'New Transfer In Finance',
    'Forecast Update',
    'Targets Update',
    'Any Update In Suppliers',
    'Items Received',
    'Update Availability Of Employees'
  ),
  Joi.array().items('sms', 'email').unique().max(2)
);

const createBranch = {
  body: Joi.object({
    name: Joi.string().trim().required(),
    manager: Joi.string().custom(objectId).required(),
    address: Joi.string().trim().required()
  })
};

const getBranch = {
  params: Joi.object({ branchId: Joi.string().custom(objectId).required() })
};

const getBranches = {
  query: Joi.object({})
};

const updateBranch = {
  params: Joi.object({ branchId: Joi.string().custom(objectId).required() }),
  body: Joi.object({
    name: Joi.string().trim(),
    manager: Joi.string().custom(objectId),
    address: Joi.string(),

    bankName: Joi.string().trim(),
    bankAccount: Joi.string().trim(),
    currency: Joi.string().trim(),
    businessName: Joi.string().trim(),
    // location: Joi.string().trim(),
    timeFormat: Joi.string().valid('12 hr', '24 hr'),
    timeZone: Joi.string(),
    payrollType: Joi.string().valid('Weekly', 'Fortnightly', 'Monthly'),
    cashAmount: Joi.number(),
    safeAmount: Joi.number(),
    closingAmount: Joi.number(),
    notification: notificationSchema
  })
};

const deleteBranch = {
  params: Joi.object({ branchId: Joi.string().custom(objectId).required() })
};

module.exports = {
  createBranch,
  getBranch,
  getBranches,
  updateBranch,
  deleteBranch
};
