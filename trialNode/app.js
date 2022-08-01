const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const KunduRoute = require("./routes/kundu");
const NitinRoute = require("./routes/nitin");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.send(
    "<html><head><title>dhdhd</title></head><body>dfvuisdi</body></html>"
  );
});
app.use(KunduRoute);
app.use(NitinRoute);

app.use("/", (req, res, next) => {
  res
    .status(404)
    .send(
      "<html><head><title>dhdhd</title></head><body>Not Found</body></html>"
    );
});
app.listen(8080);
