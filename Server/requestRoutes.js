var express = require("express");
var router = express.Router();
var mysql = require("./databaseConnection");
var bodyParser = require("body-parser");

//******************
//* Create account *
//******************
router.post("/createAccount", function (req, res, next) {
  var holdOBJ = req.body;
  var email = holdOBJ.email;
  var password = holdOBJ.password;

  mysql.query(
    `INSERT INTO customers(customerEmail,customerPassword) VALUES("${email}","${password}")`,
    function (err, result, field) {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          res.send("dupEmail");
        } else {
          res.send("err");
        }
      } else {
        res.send("createSuccess");
      }
    }
  );
});

//****************
//* Verify Login *
//****************
router.post("/verifyLogin", function (req, res, next) {
  var holdOBJ = req.body;
  var email = holdOBJ.email;
  var password = holdOBJ.password;

  mysql.query(
    `SELECT * FROM \`customers\` WHERE customerEmail = "${email}"`,
    function (err, result, field) {
      //if: DB error
      if (err) {
        console.log(err);
        res.send("DB error");
      } else {
        //if: the returned object is empty, no account with supplied email was found
        if (JSON.stringify(result) === JSON.stringify([])) {
          console.log("accountDoesntExist");
          res.send("accountDoesntExist");
        }
        //else if: the supplied password doesn't match the actual password of the email account (account exists)
        else if (result[0].customerPassword !== password) {
          console.log("incorrectPassword");
          res.send("incorrectPassword");
        }
        //else login was succesful
        else {
          //remove customer password before sending back the rest of the object, for ex. -->  [{ customerID: 1, customerEmail: 'test@gmail.com' }]
          delete result[0].customerPassword;
          console.log("Successful login");
          res.send(result);
        }
      }
    }
  );
});

module.exports = router;
