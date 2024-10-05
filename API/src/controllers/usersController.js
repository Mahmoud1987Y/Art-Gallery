const logging = require("../helper/logging");
const { Users } = require("../models/Users");
const { validate } = require("../helper/validation");
const { verifiedEncryption, hashPassword } = require("../helper/encrypt");
const { where } = require("sequelize");

exports.getUsers = async (req, res, next) => {
  try {
    const result = Users.findAll();
    res.status(400).json({ status: "OK", data: result, error: {} });
  } catch (error) {
    next(error); // Forward the error to the error handler
  }
};
exports.login = async (req, res, next) => {
  const data = req.body;
  // check validation for req.body
  const validateData = await validate(data);
  if (validateData.error) {
    res.send(validateData.error.details[0].message);
  } else {
    // get password fro DB

    try {
      const result = await Users.findOne({ where: { email: data.email } });
      if (result) {
        if (verifiedEncryption(result.password_hash, data.password)) {
          res.status(200).json({
            message: "OK",
            result: { ...result.dataValues, password_hash: undefined },
            error: {},
          });
        } else {
          res.status(404).json({ message: "email or password not correct" });
        }
      } else {
        res.status(404).json({ message: "email or password not correct" });
      }
    } catch (err) {
      next(err);
    }
    //check validationof password
  }
};
exports.addUser = async (req, res, next) => {
  const data = req.body;
  // check validation for req.body
  const validateData = await validate(data);
  if (validateData.error) {
    res.send(validateData.error.details[0].message);
  } else {
    // get password fro DB

    try {
      const result = await Users.findOne({ where: { email: data.email } });

      if (!result) {
        const hashedPassword = hashPassword(req.body.password);
        try {
          const newUser = { ...data, password_hash: hashedPassword };

          const result = await Users.create(newUser);
          res.status(200).json({
            message: "ok",
            user: { ...result, password: undefined },
            error: {},
          });
        } catch (error) {
          next(error);
        }
      } else {
        res.status(401).json({ message: "user is already exist" });
      }
    } catch (err) {
      next(err);
    }
    //check validationof password
  }
};
exports.updateUser = (req, res, next) => {
  res.send("updateUser");
};
exports.deleteUser = (req, res, next) => {
  res.send("deleteUser");
};
