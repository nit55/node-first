const mongodb = require("mongodb");
const getDB = require("../util/database").getDB;

class Product {
  constructor(
    title,
    type,
    price,
    weight,
    details,
    availableQuantity,
    imageUrl,
    brand,
    userId
  ) {
    this.title = title;
    this.type = type;
    this.price = price;
    this.weight = weight;
    this.details = details;
    this.availableQuantity = availableQuantity;
    this.imageUrl = imageUrl;
    this.brand = brand;
    this.userId = userId;
  }

  save() {
    const db = getDB();
    console.log(this);

    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static getAllProducts() {
    const db = getDB();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => {
        throw err;
      });
  }

  static findById(prodId) {
    console.log(prodId);
    const db = getDB();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .toArray()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static postEditProduct(prodId, body) {
    const db = getDB();
    return db
      .collection("products")
      .updateOne({ _id: new mongodb.ObjectId(prodId) }, { $set: body })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }

  static findProductDetail(prodId) {
    const db = getDB();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .project({ title: 1, price: 1, brand: 1, weight: 1, details: 1 })
      .toArray()
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //   static deleteProduct(prodId) {
  //     const db = getDB();
  //     return db
  //       .collection("products")
  //       .find({ _id: new mongodb.ObjectId(prodId) })
  //       .next()
  //       .then((result) => {
  //         if (result) {
  //           return db.collection("products").deleteOne(result);
  //         } else {
  //           console.log("absent");
  //           return "does not exist";
  //         }
  //       })
  //       .then((result) => {
  //         return result;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         throw err;
  //       });
  //   }

  static deleteProduct(prodId) {
    const db = getDB();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
        // console.log(result);
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }

  static findByUserId(userId) {
    // console.log(userId);
    const db = getDB();
    return db
      .collection("products")
      .find({ userId: new mongodb.ObjectId(userId) })
      .toArray()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
