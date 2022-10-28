const { ObjectId } = require('mongoose').Types;
require('express-async-errors');

const JobTitle = require('../models/jobTitle.model');

const createJobTitle = async (name, branchId) => {
  const jobTitle = await JobTitle.create({ name, branch: branchId });
  return jobTitle;
};

const getJobTitles = async (branchId) => {
  const jobTitles = await JobTitle.find({ branch: branchId });
  return jobTitles;
};

const deleteJobTitle = async (jobTitleId, branchId) => {
  const jobTitle = await JobTitle.deleteOne({ _id: new ObjectId(jobTitleId), branch: branchId });
  return jobTitle;
};

module.exports = {
  createJobTitle,
  getJobTitles,
  deleteJobTitle
};
