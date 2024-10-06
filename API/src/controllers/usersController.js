const logging = require("../helper/logging");
const { Users, TokensModel } = require("../models/Users");
const { validate } = require("../helper/validation");
const { verifiedEncryption, hashPassword } = require("../helper/encrypt");
const { where } = require("sequelize");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res, next) => {
  try {
    const result = await Users.findAll();
    res.status(400).json({
      status: "OK",
      data: { ...result, password_hash: undefined },
      error: {},
    });
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
          const token = await jwt.sign(
            {
              user_data: {
                id: result.id,
                username: result.username,
                email: result.email,
                firest_name: result.firest_name,
                last_name: result.last_name,
                profile_picture_url: res.profile_picture_url,
                role: result.role,
                permissions: result.permissions,
              },
            },
            process.env.SECRET_KEY,
            {
              subject: "Access API",
              expiresIn: "10m",
            }
          );

          const refreshToken = await jwt.sign(
            {
              user_data: {
                id: result.id,
                username: result.username,
                email: result.email,
                firest_name: result.firest_name,
                last_name: result.last_name,
                profile_picture_url: res.profile_picture_url,
                role: result.role,
                permissions: result.permissions,
              },
            },
            process.env.REFRESH_TOKEN_SECRET,
            { subject: "refresh token", expiresIn: "1w" }
          );
          console.log(
            "************************************************************************"
          );
          console.log(refreshToken);
          console.log(
            "************************************************************************"
          );

          await TokensModel.create({ refreshToken, user_id: result.id });

          res.status(200).json({
            message: "OK",
            result: { ...result.dataValues, password_hash: undefined },
            token: token,
            refreshToken,
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

// refresh token route

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: "refresh token is not found" });
    }
    const decodedRefreshToken = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const userRefreshToken = await TokensModel.findOne({
      where: { refreshToken, id: decodedRefreshToken.id },
    });
    if (!userRefreshToken) {
      return res
        .status(401)
        .json({ message: "Refresh token is invalid or expired" });
    }
    await TokensModel.destroy({ where: { id: userRefreshToken.user_id } });
    const token = await jwt.sign(
      {
        user_data: {
          id: decodedRefreshToken.user_data.user_id,
          username: decodedRefreshToken.user_data.username,
          email: decodedRefreshToken.user_data.email,
          firest_name: decodedRefreshToken.user_data.firest_name,
          last_name: decodedRefreshToken.user_data.last_name,
          profile_picture_url:
            decodedRefreshToken.user_data.profile_picture_url,
          role: decodedRefreshToken.user_data.role,
          permissions: decodedRefreshToken.user_data.permissions,
        },
      },
      process.env.SECRET_KEY,
      {
        subject: "Access API",
        expiresIn: "10m",
      }
    );

    const newRefreshToken = await jwt.sign(
      {
        user_data: {
          user_id: decodedRefreshToken.user_data.user_id,
          username: decodedRefreshToken.user_data.username,
          email: decodedRefreshToken.user_data.email,
          firest_name: decodedRefreshToken.user_data.firest_name,
          last_name: decodedRefreshToken.user_data.last_name,
          profile_picture_url:
            decodedRefreshToken.user_data.profile_picture_url,
          role: decodedRefreshToken.user_data.role,
          permissions: decodedRefreshToken.user_data.permissions,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { subject: "refresh token", expiresIn: "1w" }
    );

    await TokensModel.create({
      refreshToken: newRefreshToken,
      user_id: decodedRefreshToken.user_data.user_id,
    });

    res.status(200).json({
      message: "OK",

      token: token,
      refreshToken: newRefreshToken,
      error: {},
    });
  } catch (error) {
    if (
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.JsonWebTokenError
    ) {
      return res
        .status(401)
        .json({ message: "refresh token is invalid or expired" });
    }
  }
};
