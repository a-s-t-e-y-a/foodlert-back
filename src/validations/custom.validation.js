const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('{{#label}} must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('{{#label}} must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('{{#label}} must contain at least 1 letter and 1 number');
  }
  return value;
};

const phoneNumber = (value, helpers) => {
  const phoneRegex = /^(\+61)\d{10}$/;
  if (!value.match(phoneRegex)) {
    return helpers.message('{{#label}} number must be of 10 digits with country code +61');
  }
  return value;
};

const pin = (value, helpers) => {
  const pinRegex = /^[0-9]{4}$/;
  if (!value.match(pinRegex)) {
    return helpers.message('{{#label}} is not valid pin');
  }

  return parseInt(value);
};

const ip = (value, helpers) => {
  const pinRegex = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;
  if (!value.match(pinRegex)) {
    return helpers.message('{{#label}} is not valid ip');
  }

  return parseInt(value);
};
const mac = (value, helpers) => {
  const pinRegex = /^(?:[[:xdigit:]]{2}([-:]))(?:[[:xdigit:]]{2}\1){4}[[:xdigit:]]{2}$/;
  if (!value.match(pinRegex)) {
    return helpers.message('{{#label}} is not valid mac');
  }

  return parseInt(value);
};
const email = (value, helpers) => {
  const pinRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (!value.match(pinRegex)) {
    return helpers.message('{{#label}} is not valid mac');
  }

  return value;
};

module.exports = {
  objectId,
  password,
  phoneNumber,
  pin,
  ip,
  mac,
  email
};
