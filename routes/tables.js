var express = require("express");
var router = express.Router();
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "dbs_project",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected!");
});

/* GET home page. */

router.get("/customer", function (req, res, next) {
  var query = "select * from customer";
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    //res.render("products", { title: "Products", products: rows });
    res.json(rows);
  });
});

router.get("/availableCars", function (req, res, next) {
  var query = "select * from available_cars";

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});

router.get("/bookingDetails", function (req, res, next) {
  var query = "select * from booking_details";

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});

router.get("/car", function (req, res, next) {
  var query = "select * from car";

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});

router.get("/carCategory", function (req, res, next) {
  var query = "select * from car_category";

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});

router.get("/discount", function (req, res, next) {
  var query = "select * from discount";

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});

router.get("/insurance", function (req, res, next) {
  var query = "select * from insurance";

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});

router.get("/ownerDetails", function (req, res, next) {
  var query = "select * from owner_details";

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});

router.get("/paymentDetails", function (req, res, next) {
  var query = "select * from payment_details";

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});

router.get("/phone", function (req, res, next) {
  var query = "select * from phone";

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});

router.get("/registrationDetails", function (req, res, next) {
  var query = "select * from registration_details";

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});

router.get("/rentalInsurance", function (req, res, next) {
  var query = "select * from rental_insurance";

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});

router.get("/review", function (req, res, next) {
  var query = "select * from review";

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.render("products", { title: "Products", products: rows });
  });
});

// router.get("/carcategory", function (req, res, next) {
//   var query = "select * from car_category";

//   connection.query(query, function (err, rows, fields) {
//     if (err) throw err;
//     //res.json(rows);
//     res.render("carCategory", { categories: rows });
//   });
// });

// router.get("/location", function (req, res, next) {
//   var query = "select * from location_details";

//   connection.query(query, function (err, rows, fields) {
//     if (err) throw err;
//     //res.json(rows);
//     res.render("locationDetails", { locations: rows });
//   });
// });

router.get("/signup", function (req, res, next) {
  var query = "select * from customer";

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    //res.json(rows);
    res.render("signup", { locations: rows });
  });
});



module.exports = router;
