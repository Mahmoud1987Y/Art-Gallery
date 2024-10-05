const logging = require("../helper/logging");
const { Users } = require("../models/Users");
const { validate } = require("../helper/validation");

exports.getUsers = async (req, res, next) => {
  try {
    const result = Users.findAll();
    res.status(400).json({ status: "OK", data: result, error: {} });
  } catch (error) {
    next(error); // Forward the error to the error handler
  }
};
exports.getUserByEmail = async (req, res, next) => {
  const data = req.body;
  const validateData = await validate(data);
  if (validateData.error) {
    res.send(validateData.error.details[0].message);
  } else {
    
    res.send("getUserByEmail");
  }
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
