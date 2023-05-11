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
  var phone = req.query.phone;
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
    "','" +
    phone +
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
    console.log(req.query.email);
    res.json(rows);
  });
});

router.get("/availableCars", function (req, res, next) {
  connection.query("CALL search_available_cars()", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// function to book a car by calling CREATE PROCEDURE bookke_car_final(IN renter_email VARCHAR(50),IN start_time DATETIME,IN end_time DATETIME,IN car_number VARCHAR(10),IN insurance_name VARCHAR(50),IN discount_code VARCHAR(20),OUT total_amount DECIMAL(10,2))
router.get("/bookCar", function (req, res, next) {
  // Get the input parameters from the request query parameters
  var renterEmail = req.query.renterEmail;
  var startTime = req.query.startTime;
  var endTime = req.query.endTime;
  var carNumber = req.query.carNumber;
  var insuranceName = req.query.insuranceName;
  var discountCode = req.query.discountCode;
  // Define the query to call the book_car procedure
  var query =
    "CALL bookke_car_final('" +
    renterEmail +
    "', '" +
    startTime +
    "', '" +
    endTime +
    "', '" +
    carNumber +
    "', '" +
    insuranceName +
    "', '" +
    discountCode +
    "', @total_amount)";
  // Execute the query using the connection object
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    // Define another query to get the output parameter value
    var query2 = "SELECT @total_amount AS total_amount";
    // Execute the second query using the connection object
    connection.query(query2, function (err2, rows2, fields2) {
      if (err2) throw err2;
      // Get the result from the first row and column
      var result = rows2[0].total_amount;
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

// get function for CREATE PROCEDURE lendd_cars(IN car_number VARCHAR(10), IN number_of_persons INT, IN number_of_luggage INT, IN cost_per_day DECIMAL(10,2), IN late_fee_per_hour DECIMAL(10,2), IN availability_car_flag INT, IN owner_first_name VARCHAR(50), IN owner_middle_name VARCHAR(50), IN owner_last_name VARCHAR(50), IN email VARCHAR(50))
router.get("/lendCar", function (req, res, next) {
  var query =
    "CALL lendd_cars('" +
    req.query.carNumber +
    "', '" +
    req.query.numberOfPersons +
    "', '" +
    req.query.numberOfLuggage +
    "', '" +
    req.query.costPerDay +
    "', '" +
    req.query.lateFeePerHour +
    "', '" +
    1 +
    "', '" +
    req.query.ownerFirstName +
    "', '" +
    req.query.ownerMiddleName +
    "', '" +
    req.query.ownerLastName +
    "', '" +
    req.query.email +
    "')";
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

// post a review having a start field and an email field
router.get("/addReview", function (req, res, next) {
  var query =
    "CALL give_review(" +
    parseInt(req.query.star) +
    ", '" +
    req.query.carNumber +
    "')";
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
  var query = "CALL show_bookings_by_customer('" + req.query.email + "')";
  console.log(query);
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

// get customer cars
router.get("/getCustomerCars", function (req, res, next) {
  var query = "CALL get_customer_cars('" + req.query.email + "')";
  console.log(query);
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

module.exports = router;
