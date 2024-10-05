const { connectMysql } = require("../database/connectMysql");
const { DataTypes } = require("sequelize");

exports.Users = connectMysql.define("Users", {
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: { min: 3, max: 100 },
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: { min: 4, isEmail: true },
  },
  password_hash: { type: DataTypes.STRING(255), allowNull: false },
  reset_token: { type: DataTypes.STRING(255) },
  reset_token_expiry: { type: DataTypes.TIME },
  email_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  email_verification_token: { type: DataTypes.STRING(255) },
  email_verification_token_expiry: { type: DataTypes.DATE },
  failed_login_attempts: { type: DataTypes.TINYINT },
  account_locked_until: { type: DataTypes.DATE },
  first_name: { type: DataTypes.STRING(100), allowNull: false },
  last_name: { type: DataTypes.STRING(100), allowNull: false },
  profile_picture_url: { type: DataTypes.STRING(255) },
  date_of_birth: { type: DataTypes.DATE },
  role: {
    type: DataTypes.ENUM(["admin", "customer", "moderator"]),
    allowNull: false,
    defaultValue: "customer",
  },
  permissions: { type: DataTypes.JSON },
  preferred_language: { type: DataTypes.ENUM(["ar", "en"]) },
});
