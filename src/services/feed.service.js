const { ObjectId } = require("mongoose").Types;
require("express-async-errors");
const feedModel = require("./../models/feed.model");

const createFeed = async ({ title, content, img, date, module }) => {
  const createdFeed = await feedModel.create({
    title,
    content,
    img,
    date,
    module,
  });

  return createdFeed;
};

const getAllFeed = async ({ module }) => {
  const getAllFeed = await feedModel.find({ module });

  return getAllFeed;
};
const getFeed = async ({ id }) => {
  const getAllFeed = await feedModel.findById(id);

  return getAllFeed;
};
const updateFeed = async ({ id, body }) => {
  const updatedFeed = await feedModel.findByIdAndUpdate(id, body, {
    new: true,
  });

  return updatedFeed;
};

const deleteFeed = async ({ id, body }) => {
  await feedModel.findByIdAndDelete(id);
};

module.exports = {
  createFeed,
  getAllFeed,
  getFeed,
  updateFeed,
  deleteFeed,
};
