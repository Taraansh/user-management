const jwt = require("jsonwebtoken");
const { errorResponse } = require("../config/response");
require("dotenv").config();

const middleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return errorResponse(req, res, "Access denied", 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.userID = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    errorResponse(req, res, "Invalid token", 400);
  }
};

module.exports = middleware;
