const successResponse = (req, res, message, data, statusCode) => {
  return res
    .status(statusCode)
    .json({ status: true, code: statusCode, data, message });
};

const errorResponse = (req, res, message, statusCode) => {
  return res
    .status(statusCode)
    .json({ status: true, code: statusCode, message });
};

module.exports = { successResponse, errorResponse };
