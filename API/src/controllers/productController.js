require("dotenv").config();
const { Product } = require("../models/Product");
const { logging } = require("../helper/logging");
const { validate } = require("../helper/validation");
const { error } = require("winston");
const { Op } = require("sequelize");
function findProduct() {}
exports.addProduct = async (req, res, next) => {
 
  console.log(req.body);
  const data = req.body;

  const validateData = await validate(data);
  if (validateData.error) {
    return res
      .status(400)
      .json({ message: validateData.error.details[0].message });
  }
  //add to database
  try {
    let img_url = null;
    if (req.file) {
      img_url = `${process.env.MAIN_PATH}:${process.env.PORT}/public/images/${req.file.filename}`;
    }

    const newProduct = { ...data, img_url };

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
  const { title, type, artist, size, description, min, max, sort } = req.query;
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
            price:
              min || max
                ? {
                    [Op.between]: [
                      min ? parseFloat(min) : 0,
                      max ? parseFloat(max) : 1000000,
                    ],
                  }
                : { [Op.gte]: 0 },
          },
          {
            description: description
              ? { [Op.like]: `%${description}%` }
              : { [Op.like]: `%%` },
          },
        ],
      },
      order: sort
        ? [["price", sort == "low" ? "ASC" : sort == "high" ? "DESC" : ""]]
        : "",

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
    const result = await Product.findAll({
      order: [["createdAt", "DESC"]], // Sort by createdAt in descending order (latest first)
      limit: 8, // Limit the result to the latest 8 products
    });

    res.status(200).json({ message: "OK", result });
  } catch (error) {
    logging.error(error);
    res.status(500).json({ message: "Error fetching latest products" });
  }
};
exports.getBestSellerProducts = async (req, res, next) => {
  try {
    const result = await Product.findAll({
      where: { is_featured: true }, // Sort by createdAt in descending order (latest first)
      limit: 8, // Limit the result to the latest 8 products
    });

    res.status(200).json({ message: "OK", result });
  } catch (error) {
    logging.error(error);
    res.status(500).json({ message: "Error fetching best seller products" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await Product.findByPk(productId);
    res.status(200).json({ message: "OK", result });
  } catch (error) {
    logging.error(error);
    res.status(404).json({ message: "cannot find product" });
  }
};
