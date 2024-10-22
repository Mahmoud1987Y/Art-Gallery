const { Router } = require("express");
const authentication = require("../../../middlewares/authentication");
const authorization = require("../../../middlewares/autherization");
const {
  addProduct,
  getProduct,
  getLatestProducts,
  getBestSellerProducts,
  getProductById,
  deleteProduct,updateProduct
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
productsRouter.put(
  "/update/:id",
  authentication,
  authorization(["admin", "moderator"]),
  upload.single("img_url"),
  updateProduct
);
productsRouter.delete(
  "/delete/:id",
  authentication,
  authorization(["admin", "moderator"]),
  deleteProduct
);
productsRouter.get("/", getProduct);
productsRouter.get("/latest", getLatestProducts);
productsRouter.get("/best-seller", getBestSellerProducts);
productsRouter.get("/:id", getProductById);
module.exports = productsRouter;
