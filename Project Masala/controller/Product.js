const { validationResult } = require("express-validator");
const mongodb = require("mongodb");
const Product = require("../model/Product");

exports.getProduct = (req, res, next) => {
  Product.getAllProducts()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      throw err;
    });
};

exports.createProduct = (req, res, next) => {
  const errors = validationResult(req);
  const userId = new mongodb.ObjectId(req.userId);
  if (!errors.isEmpty()) {
    const error = new Error();
    error.statusCode = 403;
    error.data = errors.array();
    throw error;
  } else {
    console.log("hdh", userId);
  }
  const {
    title,
    type,
    price,
    weight,
    details,
    availableQuantity,
    imageUrl,
    brand,
  } = req.body;

  const products = new Product(
    title,
    type,
    price,
    weight,
    details,
    availableQuantity,
    imageUrl,
    brand,
    userId
  );
  products
    .save()
    .then((result) => {
      res.status(201).send([
        {
          message: "post success",
          posts: result,
        },
      ]);
    })
    .catch((error) => {
      console.log(error, "in error");
      // if (!error) {
      //   error.statusCode = 500;
      // }
      next(error);
    });
};

exports.editProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  const body = req.body;
  Product.postEditProduct(productId, body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      throw err;
    });
};

exports.detailsProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findProductDetail(productId)
    .then((data) => {
      res.status(201).json([
        {
          message: "product detail",
          posts: data,
        },
      ]);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  console.log(productId);
  Product.deleteProduct(productId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      throw err;
    });
};

exports.getSellerProduct = (req, res, next) => {
  const userId = new mongodb.ObjectId(req.userId);
  const requserId = req.userId;
  console.log(userId, "dfsdfsfsflslss", requserId);

  Product.findByUserId(requserId)
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      console.log(err, "in error");
      throw err;
    });
};
