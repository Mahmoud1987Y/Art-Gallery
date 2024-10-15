const { Product } = require("../models/Product");
const { logging } = require("../helper/logging");
const { validate } = require("../helper/validation");
const { error } = require("winston");
const { Op } = require("sequelize");

exports.addProduct = async (req, res, next) => {
  const data = req.body;
  const validateData = await validate(data);
  if (validateData.error) {
    return res
      .status(400)
      .json({ message: validateData.error.details[0].message });
  }
  //add to database
  try {
    const newProduct = { ...data };
    console.log(newProduct);
    const result = await Product.create(newProduct);
    return res
      .status(200)
      .json({ message: "ok", product: newProduct, error: {} });
  } catch (error) {
    logging.error(error);
    return res.status(500).json({ message: "cannot add product" });
  }
};
exports.getProduct = async (req, res, next) => {
  const title = req.query.title;
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  console.log(title);
  try {
    const result = await Product.findAll({
      where: {
        title: title ? { [Op.like]: `%${title}%` } : { [Op.like]: `%%` },
      },
      limit: parseInt(limit),
      offset: parseInt(limit * (page - 1)),
    });
    res.status(201).json({ message: "OK", result });
  } catch (error) {
    logging.error(error);
    console.log(error);
    return res.status(401).json({ message: "cannot retrive data" });
  }
};
