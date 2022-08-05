const mongodb = require("mongodb");

const getDB = require("../util/database").getDB;

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  save() {
    const db = getDB();
    console.log(this);
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static showLogin(email) {
    const db = getDB();
    return db
      .collection("users")
      .findOne(email)
      .then((user) => {
        return user;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static findById(userId) {
    const db = getDB();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then((user) => {
        console.log("usermodel----", user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
