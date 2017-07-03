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

app.get("/zipcodepage", function(req, res) {
  const zipcode = req.query.zipcode;
  //console.log("zipcode found: " + zipcode);
  leg_api.legislatorInfoByZipCode(zipcode)
  .then((data) => {
    let house = data[0];
    let senate = data[1];
    res.render("partials/zipcodepage", {
      houseLegs: house,
      senateLegs: senate
    });
  });
});


app.use("/legislator", function(req, res, next) {
  app.locals.bioguide_id = req.query.bioguideID;
  leg_api.legislatorInfo(app.locals.bioguide_id)
  .then((legislatorInfo) => {
    app.locals.legislator = legislatorInfo;
    next();
  });
});

app.use("/legislator", function(req, res, next) {
  leg_api.billInfoRequest(app.locals.bioguide_id)
  .then((result) => {
    app.locals.bills = result;
    next();
  });
})


app.get('/legislator', function(req, res) {
    let legislator = app.locals.legislator;
    let bills = app.locals.bills;

    res.render("partials/legislator", {legislator, bills});
});


app.listen(port);
