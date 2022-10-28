const Joi = require('joi');

const { objectId, phoneNumber, pin, ip, mac, password } = require('./custom.validation');

const visaSchema = Joi.object({
  type: Joi.string()
    .valid('Student Visa(20hrs limit)', 'Student Visa(non restricted)', 'Temporary Work Visa', 'PR', 'Citizen')
    .required(),
  expiryDate: Joi.date().optional()
});

const tenureSchema = Joi.object({
  period: Joi.string().valid('Day', 'Month', 'Year').required(),
  duration: Joi.number().required()
});

const emergencyContactSchema = Joi.object({
  fullName: Joi.string().trim().required(),
  phoneNumber: Joi.string().custom(phoneNumber).trim().required(),
  relation: Joi.string().trim().required()
});

const experienceSchema = Joi.object({
  companyName: Joi.string().trim(),
  department: Joi.string().trim(),
  jobTitle: Joi.string().trim(),
  startDate: Joi.date(),
  endDate: Joi.date()
});

const accessSchema = Joi.object().pattern(
  Joi.string().valid(
    'SAFE_DEPOSIT',
    'STOCKTAKE',
    'SUPPLIER',
    'BUILD_CART',
    'WORKFORCE',
    'TASKS',
    'OPERATIONS',
    'SCHEDULE_SHIFT',
    'CATERING_ORDERS',
    'MENU',
    'NEWS_FEED'
  ),
  Joi.array().items('view', 'edit', 'add').unique().max(3)
);

const createEmployee = {
  body: Joi.object({
    fullName: Joi.string().trim().required(),
    dob: Joi.date().required(),
    gender: Joi.string().valid('Male', 'Female', 'Others').required(),
    phoneNumber: Joi.string().custom(phoneNumber).required(),
    email: Joi.string().lowercase().email().trim().required(),

    fullAddress: Joi.string().required(),

    branch: Joi.string().custom(objectId).required(),
    // department: Joi.string().custom(objectId),
    // jobTitle: Joi.string().custom(objectId),
    department: Joi.string().trim().required(),
    jobTitle: Joi.string().trim().required(),
    employementType: Joi.string().valid('FullTime', 'PartTime', 'Casual'),
    tenure: tenureSchema.required(),

    visa: visaSchema.required(),
    payrollGroup: Joi.string().custom(objectId).required(),

    workSlot: Joi.array().items(Joi.array().items(Joi.string()).max(2)).length(7).required(),

    emergencyContact: emergencyContactSchema,

    experience: experienceSchema

    // resume: Joi.any()
    // sickCertificate: Joi.any(),

    // role: Joi.string().custom(objectId),
    // access: accessSchema
  })
};

const getEmployee = {
  params: Joi.object({ employeeId: Joi.string().custom(objectId).required() })
};

const getEmployees = {
  query: Joi.object({
    role: Joi.boolean()
  })
};

const updateEmployee = {
  params: Joi.object({ employeeId: Joi.string().custom(objectId).required() }),
  body: Joi.object({
    fullName: Joi.string().trim(),
    dob: Joi.date(),
    gender: Joi.string().valid('Male', 'Female', 'Others'),
    phoneNumber: Joi.string().custom(phoneNumber),
    email: Joi.string().lowercase().email().trim(),
    avatar: Joi.string(),

    fullAddress: Joi.string(),

    branch: Joi.string().custom(objectId),
    department: Joi.string().custom(objectId),
    jobTitle: Joi.string().custom(objectId),
    employementType: Joi.string().valid('FullTime', 'PartTime', 'Casual'),
    tenure: tenureSchema,

    visa: visaSchema,
    payrollGroup: Joi.string().custom(objectId),

    workSlot: Joi.array().items(Joi.array().items(Joi.string()).max(2)).length(7),

    // pin: Joi.number().custom(pin),

    ip: Joi.string().custom(ip),
    mac: Joi.string().custom(mac),
    // password: Joi.string().custom(password),

    emergencyContact: emergencyContactSchema,

    experience: experienceSchema,
    sickCertificate: Joi.any(),
    resume: Joi.string(),
    role: Joi.string(),
    access: accessSchema
  })
};

const deleteEmployee = {
  params: Joi.object({ employeeId: Joi.string().custom(objectId).required() })
};

module.exports = {
  createEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee
};
