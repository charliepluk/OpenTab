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

  //insert data for the new account
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
        console.log("createSuccess");
      }
    }
  );

  //select the newly created account and return its information
  mysql.query(
    `SELECT * FROM \`customers\` WHERE customerEmail = "${email}"`,
    function (err, result, field) {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          res.send("dupEmail");
        } else {
          res.send("err");
        }
      } else {
        console.log("selectSuccess");
        delete result[0].customerPassword;
        res.send(result);
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

//********************************
//* Get info for all restaurants *
//********************************
router.get("/getRestaurants", function (req, res, next) {
  mysql.query(`SELECT * FROM \`restaurants\` WHERE 1`, function (
    err,
    result,
    field
  ) {
    if (err) {
      console.log(err);
      res.send("DB error");
    } else {
      console.log("gotRestaurants");
      res.send(JSON.stringify(result));
    }
  });
});

//*************************************
//* Get menu for a specific restaurant*
//*************************************
router.post("/getRestaurantMenu", function (req, res, next) {
  var holdOBJ = req.body;
  var restID = holdOBJ.restID;

  //select all from items where restID equals the supplied restID
  mysql.query(`SELECT * FROM \`items\` WHERE restID="${restID}"`, function (
    err,
    result,
    field
  ) {
    //if: DB error
    if (err) {
      console.log(err);
      res.send("DB error");
    } else {
      console.log("gotRestaurantMenu");
      res.send(JSON.stringify(result));
    }
  });
});

//******************************
//* Get customer order history *
//******************************
router.post("/getCustomerOrderHistory", function (req, res, next) {
  var userID = req.body.userID;

  mysql.query(
    `SELECT orders.orderID, restaurants.restID, orders.orderDateTime, restaurants.restName, restaurants.restLocation FROM orders
    INNER JOIN restaurants ON orders.restID=restaurants.restID
    WHERE customerID="${userID}"
    ORDER BY orderDateTime DESC`,
    function (err, result, field) {
      if (err) {
        console.log(err);
        res.send("DB error");
      } else {
        var holdFormattedTime = "";
        var resultSize = Object.keys(result).length;

        //properly format all date times
        for (i = 0; i < resultSize; i++) {
          //split date time into individual strings for manipulation
          holdFormattedTime = result[i]["orderDateTime"]
            .toString()
            .split(" ", 5);

          result[i]["orderDateTime"] =
            holdFormattedTime[1] +
            " " +
            holdFormattedTime[2] +
            ", " +
            holdFormattedTime[3] +
            " - " +
            holdFormattedTime[4];
        }
        console.log(result);
        console.log("gotCustomerOrderHistory");
        res.send(result);
      }
    }
  );
});

//****************************************
//* Get order items for specific orderID *
//****************************************
router.post("/getOrderItems", function (req, res, next) {
  var orderID = req.body.orderID;

  //gets all orderItems for a given orderID. Returns the itemQuantity, totalPriceOfItems, itemName and itemID
  mysql.query(
    `SELECT order_items.itemQuantity, order_items.totalPriceOfItems, items.itemName, items.itemID FROM order_items
  INNER JOIN items ON order_items.itemID=items.itemID
  WHERE orderID="${orderID}"`,
    function (err, result, field) {
      //if: DB error
      if (err) {
        console.log(err);
        res.send("DB error");
      } else {
        console.log(result[0]);
        console.log("gotOrderItems");
        res.send(result);
      }
    }
  );
});

//The line below returns orderID after inserting
//`INSERT INTO orders(restID, customerID, orderNotes) VALUES (1,1,'')  RETURNING orderID as orderID`
module.exports = router;
