const validateSchema = (req, schema) => {
  const { error } = schema.body.validate(req.body);
  return error;
};
module.exports = validateSchema;
