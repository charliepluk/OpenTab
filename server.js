const mysql = require("./databaseConnection");
var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

//Test DB inserting
/*
mysql.query(`INSERT INTO items(restID,itemName,itemPrice) VALUES(2,"testItem",12.50)`, function(error, result, field) {
   if (error) {
       if(error.code === "ER_DUP_ENTRY"){
           console.log("THE EMAIL ALREADY EXISTS");
       }
       console.log(error);
   }
   else {
       console.log("FINISHED");
   }
});*/
