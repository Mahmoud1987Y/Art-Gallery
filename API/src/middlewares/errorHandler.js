const { logging } = require("../helper/logging");
const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500; // Default to 500 if no status
  logging.error(err);
  res.status(statusCode).json({
    status: "error",
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // Only show stack trace in development
  });
};
const notFoundHandler = (req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  logging.error(err);
  next(error);
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
