const { logging } = require("../helper/logging");
exports.errorHandler = (error, req, res, next) => {
  if (error) {
    logging.error(error);
    res.status(500).send("server error");
  }
  next();
};
