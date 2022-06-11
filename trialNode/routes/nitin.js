const express = require("express");

const router = express.Router();

router.get("/nitin", (req, res, next) => {
  res.send(
    "<html><head><title>dhdhd</title></head><body><form method='post' action='/nitin'><input type='text' name='message' /><button type='submit'>submit</button></form></body></html>"
  );
});

router.post("/nitin", (req, res, next) => {
  console.log(req.body.message);
  res.redirect("/kundu");
});

module.exports = router;
