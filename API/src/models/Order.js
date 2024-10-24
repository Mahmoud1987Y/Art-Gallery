const { DataTypes } = require("sequelize");
const { connectMysql } = require("../database/connectMysql");
const { Address } = require("../models/Address");
const { Users } = require("../models/Users");
const { Product } = require("../models/Product");

exports.Order = connectMysql.define("Order", {
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", // References the Users table
      key: "id",
    },
  },
  ProductId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Product", // References the Products table
      key: "id",
    },
  },
  AddressId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Address", // References the Addresses table
      key: "id",
    },
  },
  status: {
    type: DataTypes.ENUM([
      "Pending",
      "Processing",
      "Confirmed",
      "On Hold",
      "Failed",
      "Canceled",
      "Refunded",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Returned",
      "Completed",
      "Awaiting Payment",
      "Awaiting Fulfillment",
      "Awaiting Shipment",
      "Partially Shipped",
      "Partially Delivered",
      "Awaiting Pickup",
    ]),
    defaultValue: "Pending",
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

