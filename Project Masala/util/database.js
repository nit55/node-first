const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const MongoConnect = (callback) => {
  MongoClient.connect("mongodb://localhost:27017/pappuDemo")
    .then((client) => {
      _db = client.db();
      callback();
    })
    .catch((err) => {
      throw err;
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "no DB found";
};

exports.MongoConnect = MongoConnect;
exports.getDB = getDB;
