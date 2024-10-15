const { DataTypes } = require("sequelize");
const { connectMysql } = require("../database/connectMysql");
exports.Product = connectMysql.define("Product", {
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  artist: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING(50),
  },
  description: {
    type: DataTypes.TEXT,
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  img_url: {
    type: DataTypes.STRING(255),
  },
});
