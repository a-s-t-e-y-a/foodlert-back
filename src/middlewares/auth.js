const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");

const ApiError = require("../utils/ApiError");
const config = require("../utils/config");

const userService = require("../services/user.service");

const auth = async (req, res, next) => {
  let token =
    req.headers["x-access-token"] ||
    req.headers.authorization ||
    req.body.token;
  if (!token) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ authenticated: false, message: "No token given" });
    // throw new ApiError(httpStatus.UNAUTHORIZED, 'No token provided');
  }

  token = token.startsWith("Bearer") && token.split(" ")[1];
// console.log(token)
  if (!token || token === "") {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ authenticated: false, message: "Invalid token" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, config.jwt.secret);
  } catch (error) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ authenticated: false, message: "Invalid token, login first!" });
  }

  let user = await userService.getUserById(decoded.sub);
  user = user.toJSON();
  req.user = user;

  // write business logic here

  next();
};

module.exports = auth;
