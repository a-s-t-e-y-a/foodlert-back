const httpStatus = require('http-status');
require('express-async-errors');

const jobTitleValidation = require('../validations/jobtitle.validation');

const jobTitleService = require('../services/jobTitle.service');

const createJobTitle = async (req, res, next) => {
  const { name } = req.body;

  const branchId = req.user.branch.id;
  const jobTitle = await jobTitleService.createJobTitle(name, branchId);
  res.status(httpStatus.CREATED).json({ jobTitle });
};

const getJobTitles = async (req, res, next) => {
  const branchId = req.user.branch.id;
  const jobTitles = await jobTitleService.getJobTitles(branchId);
  res.json({ jobTitles });
};

const deleteJobTitle = async (req, res, next) => {
  const { jobTitleId } = req.params;
  const branchId = req.user.branch.id;
  const jobTitle = await jobTitleService.deleteJobTitle(jobTitleId, branchId);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  createJobTitle,
  getJobTitles,
  deleteJobTitle
};
