const { check, body, checkSchema } = require("express-validator");
const getDB = require("../util/database").getDB;
// exports.createProductSchema = [
//   check("title")
//     .trim()
//     .not()
//     .isEmpty()
//     .withMessage("Title should not be empty")
//     .isLength({ min: 3, max: 12 })
//     .withMessage("should be a minimum of 3 and maximum of 12 characters"),

//   check("type").trim().not().isEmpty().withMessage("Type should not be empty"),
// ];

const typeArray = ["chilli", "masala"];
exports.createProductSchema = [
  checkSchema({
    title: {
      trim: true,
      isLength: {
        errorMessage: "should be a minimum of 3 and maximum of 12 characters",
        // Multiple options would be expressed as an array
        options: { min: 3, max: 12 },
      },
      matches: {
        options: [/^[a-z,A-Z ]+$/],
        errorMessage: "Please enter alphabets only",
      },
    },
    type: {
      trim: true,
      isLength: {
        errorMessage: "should be a minimum of 3 ",
        // Multiple options would be expressed as an array
        options: { min: 3 },
      },
      isIn: {
        options: [typeArray],
        errorMessage: "Unknown type, must be one of" + ` ${typeArray}`,
      },
      //   custom: {
      //     options: (value, { req }) => {
      //       console.log(typeArray.includes(value));
      //       if (typeArray.includes(value.toLowerCase()) === true) {
      //         console.log("inside true");
      //         return true;
      //       }
      //     },
      //     errorMessage: "Unknown type, must be one of" + ` ${typeArray}`,
      //   },
    },
    price: {
      trim: true,
      optional: false,
      isNumeric: {
        errorMessage: "The product price must be a valid number",
      },
    },
    weight: {
      trim: true,
      not: true,
      isEmpty: true,
      // matches: {
      //   options: [/\d{2,3} ?gm|kg$/],
      //   errorMessage: "enter like 50gm or 50kg",
      // },
      custom: {
        options: (value, { req }) => {
          let weightFormat = value.split(" ")[1].toLowerCase();
          let weightNumber = value.split(" ")[0];
          if (
            weightFormat == "kg" &&
            parseInt(weightNumber) >= 1 &&
            parseInt(weightNumber) <= 25
          ) {
            return true;
          }
          if (
            weightFormat == "gm" &&
            parseInt(weightNumber) >= 50 &&
            parseInt(weightNumber) <= 999
          ) {
            return true;
          }
          // if (
          //   (weightFormat == "gm" && weightNumber < 50) ||
          //   weightNumber > 1000
          // ) {
          //   return false;
          // }
          console.log(weightFormat, parseInt(weightNumber));
          return false;
        },
        errorMessage:
          "enter a valid weight, for grams less than 1000 and kg less than 25",
      },
    },
    details: {
      trim: true,
      not: true,
      isEmpty: true,
      errorMessage: "should not be empty",
    },
    availableQuantity: {
      trim: true,
      not: true,
      isEmpty: true,
      errorMessage: "should not be empty",
      isNumeric: {
        errorMessage: "must be a valid number",
      },
    },
    imageUrl: {
      trim: true,
      not: true,
      isEmpty: true,
      errorMessage: "should not be empty",
    },
    brand: {
      trim: true,
      not: true,
      isEmpty: true,
      errorMessage: "should not be empty",
    },
  }),
];

exports.userSignupSchema = [
  checkSchema({
    name: {
      trim: true,
      not: true,
      isEmpty: true,
      errorMessage: "should not be empty",
      isLength: {
        errorMessage: "should be a minimum of 3 characters",
        options: { min: 3 },
      },
      matches: {
        options: [/^[a-z,A-Z ]+$/],
        errorMessage: "Please enter alphabets only",
      },
    },
    email: {
      trim: true,
      isEmail: true,
      custom: {
        options: (value, { req }) => {
          const db = getDB();
          return db
            .collection("users")
            .findOne({ email: value })
            .then((result) => {
              console.log(result);
              if (result) {
                return Promise.reject("email already exists");
              }
            });
        },
      },
      errorMessage: "Please enter a valid email Id",
    },
    password: {
      trim: true,
      isAlphanumeric: true,
      isLength: {
        errorMessage: "should be a minimum of 5 ",
        options: { min: 5 },
      },
      errorMessage: "Please enter a valid password",
    },
  }),
];

exports.userLoginSchema = [
  checkSchema({
    email: {
      trim: true,
      isEmail: true,
      errorMessage: "Please enter a valid email Id",
    },
    password: {
      trim: true,
      isLength: {
        errorMessage: "should be a minimum of 5 ",
        options: { min: 5 },
      },
      errorMessage: "Please enter a valid password",
    },
  }),
];
