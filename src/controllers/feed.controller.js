const httpStatus = require("http-status");
const validateSchema = require("./../validations/schema.validation");
const ApiError = require("./../utils/ApiError");
require("express-async-errors");

const feedValidation = require("../validations/feed.validation");

const feedService = require("../services/feed.service");

const createFeed = async (req, res, next) => {
  const err = validateSchema(req, feedValidation.createFeed);
  if (err) return next(new ApiError(404, `${err.details[0].message}`));

  const { title, content, img, date, module } = req.body;

  const createdFeed = await feedService.createFeed({
    title,
    content,
    img,
    date,
    module,
  });
  res.status(httpStatus.CREATED).send({ createdFeed });
};

const getAllFeed = async (req, res, next) => {
  const getAllFeed = await feedService.getAllFeed({ module: req.query.module });
  res
    .status(httpStatus.CREATED)
    .send({ totalFeed: getAllFeed.length, getAllFeed });
};

const getFeed = async (req, res, next) => {
  const id = req.params.id;
  const getFeed = await feedService.getFeed({ id });
  res.status(httpStatus.CREATED).send({ getFeed });
};

const updateFeed = async (req, res, next) => {
  const id = req.params.id;

  const updatedFeed = await feedService.updateFeed({ id, body: req.body });
  res.status(httpStatus.CREATED).send({ updatedFeed });
};

const deleteFeed = async (req, res, next) => {
  const id = req.params.id;

  await feedService.deleteFeed({ id });
  res.status(httpStatus.CREATED).send({});
};

module.exports = { createFeed, getAllFeed, updateFeed, getFeed, deleteFeed };
