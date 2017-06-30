"use strict";

const request     = require("request");
const _           = require("lodash");
const leg_api     = require("./lib/legislatorAPI");

const express     = require("express");
const app         = express();
const handlebars  = require("express-handlebars").create({defaultLayout:'main'});


// Set handlebars framework on top of express
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);

// Set up static content directory (set to '/public')
app.use(express.static(__dirname + '/public'));

// Set up all possible pages
app.get('/', function(req, res) {
  res.render("partials/homepage");
});

// General middleware usage. This will execute regardless of URL
/*
app.use(function(req, res, next) {
  console.log("Looking for URL: " + req.url);
  console.log("testing!!!!");
  next();
});
*/

app.get("/zipcodepage", function(req, res) {
  const zipcode = req.query.zipcode;
  console.log("zipcode found: " + zipcode);
  leg_api.legislatorInfoByZipCode(zipcode)
  .then((data) => {
    let house = data[0];
    let senate = data[1];
    console.log(data[0][0]);
    res.render("partials/zipcodepage", {
      houseLegs: house,
      senateLegs: senate
    });
  });
});


app.get('/legislator', function(req, res) {
  res.render("partials/legislator");
});


app.listen(app.get("port"), () => {
  console.log("Express started on http://localhost:" + app.get("port"));
});
