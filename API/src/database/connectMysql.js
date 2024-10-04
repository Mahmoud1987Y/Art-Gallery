require("dotenv").config();

const { Sequelize } = require("sequelize");

exports.connectMysql = new Sequelize(
  process.env.DATABASE,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST_NAME,
    dialect: process.env.DIALECT,
  }
);
