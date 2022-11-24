const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createFeed = {
  body: Joi.object({
    title: Joi.string().trim().required(),
    content: Joi.string().trim().required(),
    image: Joi.string().trim(),
    date: Joi.string().trim(),
    module: Joi.string().trim().required(),
  }),
};

module.exports = { createFeed };
