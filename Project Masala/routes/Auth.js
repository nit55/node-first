const express = require("express");

const UserController = require("../controller/Auth");
const UserSchema = require("../validations/validations");

const router = express.Router();

router.post(
  "/signup",
  UserSchema.userSignupSchema,
  UserController.createSignup
);

router.post("/login", UserSchema.userLoginSchema, UserController.showLogin);

// router.post(
//   "/create-product",
//   [createProductSchema],
//   ProductController.createProduct
// );

module.exports = router;
