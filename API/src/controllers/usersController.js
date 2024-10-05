const logging = require("../helper/logging");
const { Users } = require("../models/Users");

exports.getUsers = async (req, res, next) => {
  try {
    
    const result = Users.findAll();
    res.status(400).json({ status: "OK", data: result, error: {} });
  } catch (error) {
    next(error); // Forward the error to the error handler
  }
};
exports.getUserByEmail = (req, res, next) => {
  res.send("getUserByEmail");
};
exports.addUser = (req, res, next) => {
  res.send("addUser");
};
exports.updateUser = (req, res, next) => {
  res.send("updateUser");
};
exports.deleteUser = (req, res, next) => {
  res.send("deleteUser");
};
