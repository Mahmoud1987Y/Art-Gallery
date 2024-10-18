const { Router } = require("express");
const authentication = require("../../../middlewares/authentication");
const authorization = require("../../../middlewares/autherization");
const {
  addProduct,
  getProduct,
  getLatestProducts,
  getBestSellerProducts,
} = require("../../../controllers/productController");
const upload = require("../../../middlewares/upload ");

const productsRouter = Router();

productsRouter.post(
  "/add-product",
  authentication,
  authorization(["admin", "moderator"]),
  upload.single("img_url"),
  addProduct
);
productsRouter.get("/", getProduct);
productsRouter.get("/latest", getLatestProducts);
productsRouter.get("/best-seller", getBestSellerProducts);
module.exports = productsRouter;
