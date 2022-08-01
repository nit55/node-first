const express = require("express");

const ProductRoutes = require("./routes/Product");
const AuthRoutes = require("./routes/Auth");
const MongoConnect = require("./util/database").MongoConnect;

// const User = require("./model/User");

const app = express();
const port = 8000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(ProductRoutes);
app.use(AuthRoutes);

app.use((error, req, res, next) => {
  //   const status = error.statusCode || 500;
  res.status(error.statusCode).send(error);
});

MongoConnect(() => {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
