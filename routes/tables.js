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

router.get("/login", function (req, res, next) {
  // Get the email and password from the request query parameters
  var email = req.query.email;
  var password = req.query.password;
  // Define the query to check for login
  // var query = "SELECT check_login('" + email + "', '" + password + "')";
  // // Execute the query using the connection object
  // connection.query(query, function (err, rows, fields) {
  //   if (err) throw err;
  //   // Get the result from the first row and column

  //   // Send the result as a JSON response
  //   // print(rows);
  //   res.json(rows);
  // });
  connection.query(
    "CALL loginn('" + email + "', '" + password + "', @success)",
    (err, result) => {
      if (err) throw err;
      connection.query("SELECT @success", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result);
      });
    }
  );
});

router.get("/signup", function (req, res, next) {
  // Get the input parameters from the request query parameters
  var firstName = req.query.firstName;
  var middleName = req.query.middleName;
  var lastName = req.query.lastName;
  var street = req.query.street;
  var city = req.query.city;
  var stateProvince = req.query.stateProvince;
  var country = req.query.country;
  var postalCode = req.query.postalCode;
  var drivingLicenseId = req.query.drivingLicenseId;
  var email = req.query.email;
  var password = req.query.password;
  // Define the query to call the signup procedure
  var query =
    "CALL signup('" +
    firstName +
    "', '" +
    middleName +
    "', '" +
    lastName +
    "', '" +
    street +
    "', '" +
    city +
    "', '" +
    stateProvince +
    "', '" +
    country +
    "', '" +
    postalCode +
    "', '" +
    drivingLicenseId +
    "', '" +
    email +
    "', '" +
    password +
    "', @success)";
  // Execute the query using the connection object
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    // Define another query to get the output parameter value
    var query2 = "SELECT @success AS success";
    // Execute the second query using the connection object
    connection.query(query2, function (err2, rows2, fields2) {
      if (err2) throw err2;
      // Get the result from the first row and column
      var result = rows2[0].success;
      // Send the result as a JSON response
      res.json(result);
    });
  });
});

router.get("/customer", function (req, res, next) {
  var query =
    "select * from customer INNER JOIN phone ON customer.email = phone.email where customer.email = '" +
    req.query.email +
    "'";
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    //res.render("products", { title: "Products", products: rows });
    //console.log(rows);

    res.json(rows);
  });
});

router.get("/availableCars", function (req, res, next) {
  connection.query("CALL search_available_cars()", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Get function to book a car
router.get("/bookCar", function (req, res, next) {
  // Get the input parameters from the request query parameters
  var email = req.query.email;
  var carNumber = req.query.carNumber;
  var startDate = req.query.startDate;
  var endDate = req.query.endDate;

  var discountId = req.query.discountId;
  var insuranceId = req.query.insuranceId;
  // Define the query to call the book_car procedure
  var query =
    "CALL book_car('" +
    email +
    "', '" +
    startDate +
    "', '" +
    endDate +
    "', '" +
    carNumber +
    "', '" +
    insuranceId +
    "', '" +
    discountId +
    "', @success)";
  // Execute the query using the connection object
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    // Define another query to get the output parameter value
    var query2 = "SELECT @success AS success";
    // Execute the second query using the connection object
    connection.query(query2, function (err2, rows2, fields2) {
      if (err2) throw err2;
      // Get the result from the first row and column
      var result = rows2[0].success;
      // Send the result as a JSON response
      res.json(result);
    });
  });
});

// Get function to update a car

router.get("/updateCar", function (req, res, next) {
  // Get the input parameters from the request query parameters
  var carNumber = req.query.carNumber;
  var carModel = req.query.carModel;
  var email = req.query.email;
  var availability = req.query.availability;

  // Define the query to call the book_car procedure
  var query =
    "CALL UpdateCarDetails('" +
    carNumber +
    "', '" +
    email +
    "', '" +
    carModel +
    "', '" +
    availability +
    "')";
  // Execute the query using the connection object
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    // Define another query to get the output parameter value
    var query2 = "SELECT @success AS success";
    // Execute the second query using the connection object
    connection.query(query2, function (err2, rows2, fields2) {
      if (err2) throw err2;
      // Get the result from the first row and column
      var result = rows2[0].success;
      // Send the result as a JSON response
      res.json(result);
    });
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

router.get("/signup", function (req, res, next) {
  var query = "select * from customer";

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    //res.json(rows);
    res.render("signup", { locations: rows });
  });
});

// add a new car
router.get("/addCar", function (req, res, next) {
  var query =
    "CALL add_car('" +
    req.body.carName +
    "', '" +
    req.body.carModel +
    "', '" +
    req.body.carCategory +
    "', '" +
    req.body.carYear +
    "', '" +
    req.body.carColor +
    "', '" +
    req.body.carMileage +
    "', '" +
    req.body.carLocation +
    "', '" +
    req.body.carStatus +
    "', '" +
    req.body.carImage +
    "', '" +
    req.body.carDescription +
    "', '" +
    req.body.carPrice +
    "', '" +
    req.body.carOwner +
    "', @success)";
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    //res.json(rows);
    //res.render("signup", { locations: rows });
    connection.query(
      "SELECT @success AS success",
      function (err2, rows2, fields2) {
        if (err2) throw err2;
        // Get the result from the first row and column
        var result = rows2[0].success;
        // Send the result as a JSON response
        res.json(result);
      }
    );
  });
});

// post a review having a start field and an email field
router.get("/addReview", function (req, res, next) {
  var query =
    "CALL give_review('" + req.query.star + "', '" + req.query.carNumber + "')";
  console.log(query);
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    //res.json(rows);
    //res.render("signup", { locations: rows });
    connection.query(
      "SELECT @success AS success",
      function (err2, rows2, fields2) {
        if (err2) throw err2;
        // Get the result from the first row and column
        var result = rows2[0].success;
        // Send the result as a JSON response
        res.json(result);
      }
    );
  });
});

// get request for show_bookings_by_customer
router.get("/showBookingsByCustomer", function (req, res, next) {
  var query =
    "CALL show_bookings_by_customer('" + req.query.email + "')";
  console.log(query);
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);

    
  });
});

// get customer cars
router.get("/getCustomerCars", function (req, res, next) {
  var query =
    "CALL get_customer_cars('" + req.query.email + "')";
  console.log(query); 
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});




module.exports = router;
