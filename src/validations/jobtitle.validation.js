const Joi = require('joi');

const { objectId } = require('./custom.validation');

const createJobTitle = {
  body: Joi.object({
    name: Joi.string().trim().required()
  })
};

const getJobTitles = {
  query: Joi.object({})
};

const deleteJobTitle = {
  params: Joi.object({ jobTitleId: Joi.string().custom(objectId).required() })
};

module.exports = {
  createJobTitle,
  getJobTitles,
  deleteJobTitle
};
