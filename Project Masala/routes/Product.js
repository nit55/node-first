const express = require("express");
const { check, body } = require("express-validator");

const ProductController = require("../controller/Product");
const createProductSchema =
  require("../validations/validations").createProductSchema;
const IsAuth = require("../middleware/Is-Auth");

const router = express.Router();

router.get("/", ProductController.getProduct);

router.get("/seller", IsAuth, ProductController.getSellerProduct);

router.post(
  "/create-product",
  [createProductSchema],
  IsAuth,
  ProductController.createProduct
);

router.get("/edit-product/:productId", IsAuth, ProductController.editProduct);

router.post(
  "/edit-product/:productId",
  IsAuth,
  ProductController.postEditProduct
);

router.get(
  "/details-product/:productId",
  IsAuth,
  ProductController.detailsProduct
);

router.post(
  "/delete-product/:productId",
  IsAuth,
  ProductController.deleteProduct
);

module.exports = router;
