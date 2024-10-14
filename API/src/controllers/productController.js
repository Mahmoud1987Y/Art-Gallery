const { Product } = require("../models/Product");
const { logging } = require("../helper/logging");
const { validate } = require("../helper/validation");
const { error } = require("winston");

exports.addProduct = async (req, res, next) => {
  const data = req.bodey;
  const validateData = await validate(data);
  if (validateData.error) {
    return res.status(400).json({ message: validateData });
  }
  //add to database
  try {
    const newProduct = { ...data };
    const result = await Product.create(newProduct);
    return res
      .status(200)
      .json({ message: "ok", product: newProduct, error: {} });
  } catch (error) {
    return res.status(500).json({ message: "cannot add product" });
  }
};
