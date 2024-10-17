const { Product } = require("../models/Product");
const { logging } = require("../helper/logging");
const { validate } = require("../helper/validation");
const { error } = require("winston");
const { Op } = require("sequelize");
function findProduct() {}
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

//get all products or set search parameter with options of limit and offset
exports.getProduct = async (req, res, next) => {
  //const title = req.query.title;
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const { title, type, artist, size, description } = req.query;
  console.log({ title, type });
  try {
    const result = await Product.findAll({
      where: {
        [Op.and]: [
          { title: title ? { [Op.like]: `%${title}%` } : { [Op.like]: `%%` } },
          { type: type ? type : { [Op.like]: `%%` } },
          {
            artist: artist ? { [Op.like]: `%${artist}%` } : { [Op.like]: `%%` },
          },
          {
            size: size ? size : { [Op.like]: `%%` },
          },
          {
            description: description
              ? { [Op.like]: `%${description}%` }
              : { [Op.like]: `%%` },
          },
        ],
      },
      limit: parseInt(limit),
      offset: parseInt(limit * (page - 1)),
    });
    res.status(200).json({ message: "OK", result });
  } catch (error) {
    logging.error(error);
    console.log(error);
    return res.status(401).json({ message: "cannot retrive data" });
  }
};

exports.getLatestProducts = async (req, res, next) => {
  try {
    const latestProducts = await Product.findAll({
      order: [["createdAt", "DESC"]], // Sort by createdAt in descending order (latest first)
      limit: 8, // Limit the result to the latest 8 products
    });

    res.status(200).json(latestProducts);
  } catch (error) {
    logging.error(error);
    res.status(500).json({ message: "Error fetching latest products" });
  }
};
