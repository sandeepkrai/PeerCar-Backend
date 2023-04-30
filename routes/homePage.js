var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/homepage", function (req, res, next) {
  res.render("homePage", { title: "Express" });
});

module.exports = router;
