var express = require("express");
var router = express.Router();
var mysql = require("./databaseConnection");
var bodyParser = require("body-parser");

//******************
//* Create account *
//******************
router.post("/createAccount", function (req, res, next) {
  var holdOBJ = req.body;

  mysql.query(
    `INSERT INTO customers(customerEmail,customerPassword) VALUES("${holdOBJ.email}","${holdOBJ.password}")`,
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

module.exports = router;
