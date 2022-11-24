const mongoose = require("mongoose");

const toJSON = require("../utils/toJSON");

const { ObjectId } = mongoose.Types;

const feedSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    date: {
      type: String,
    },
    module: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

toJSON(feedSchema);

const Feed = mongoose.model("Feed", feedSchema);

module.exports = Feed;
