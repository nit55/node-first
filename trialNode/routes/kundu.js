const express = require("express");

const router = express.Router();

router.get("/kundu", (req, res, next) => {
  res.send(
    "<html><head><title>dhdhd</title></head><body>Hello kUNDU</body></html>"
  );
});

module.exports = router;
