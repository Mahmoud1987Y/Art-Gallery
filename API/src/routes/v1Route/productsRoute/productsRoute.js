const { Router } = require("express");
const authentication = require("../../../middlewares/authentication");
const authorization = require("../../../middlewares/autherization");
const { addProduct } = require("../../../controllers/productController");

const productsRouter = Router();

productsRouter.post(
  "/add-product",
  authentication,
  authorization(["admin","moderator"]),
  addProduct
);

module.exports = productsRouter;
