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


const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/signup-data", function (req, res) {

  console.log(req.body);
  const dl_number = req.body.dl_number;
  const first_name = req.body.first_name;
  const middle_name = req.body.middle_name;
  const last_name = req.body.last_name;
  const phone_number = req.body.phone_number;
  const email = req.body.email;
  const street = req.body.street_address;
  const city = req.body.city;
  const state = req.body.state;
  const zip_code = req.body.zip_code;
  const password = req.body.password;
  connection.query(
    "CALL register_customer(?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      first_name,
      middle_name,
      last_name,
      street,
      city,
      state,
      phone_number,
      email,
      password,
    ],
    (error, results, fields) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Customer registered successfully");
      }
      // Close the database connection
      connection.end();
    }
  );
});




module.exports = router;