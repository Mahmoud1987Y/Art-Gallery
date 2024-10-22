const { DataTypes } = require("sequelize");
const { connectMysql } = require("../database/connectMysql");
const User = require("../models/Users"); 
// Define Address model
const Address = connectMysql.define(
  "Address",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    // Foreign Key: user_id
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, 
        key: "id", 
      },
      onDelete: "CASCADE", 
      onUpdate: "CASCADE", 
    },
  },
  {
    tableName: "addresses", // Name of the table in DB
    timestamps: true, // Enables createdAt and updatedAt fields
  }
);

// Create realation 
User.hasMany(Address, { foreignKey: "user_id" });
Address.belongsTo(User, { foreignKey: "user_id" });

module.exports = Address;
