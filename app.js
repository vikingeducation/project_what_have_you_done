const request = require('request');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var representatives = require('./routes/representatives');

var app = express();

///////////////////
// Legislators:

var options = {
  url: 'https://congress.api.sunlightfoundation.com/legislators/locate/?zip=98122',
  headers: {
    'User-Agent': 'request'
  }
};

var repArr = [];
var selectedRep = repArr[0];

function representative(id, name, chamber, party, phone, website) {
  this.id = id;
  this.name = name;
  this.chamber = chamber;
  this.party = party;
  this.phone = phone;
  this.website = website;
}

function repData(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);

    for (var i = 0; i < info.results.length; i++) {
      var rep = new representative(
        info.results[i].bioguide_id,
        info.results[i].first_name + " " + info.results[i].last_name,
        info.results[i].chamber,
        info.results[i].party,
        info.results[i].phone,
        info.results[i].website);

      repArr.push(rep);
    }
    console.log(repArr);
  }
  else {
    console.log("Something went wrong here...");
  }
}

var zip = '98122';
var getReps = function (zipcode) {
  options.url = 'https://congress.api.sunlightfoundation.com/legislators/locate/?zip=' + zipcode;
  request(options, repData);
}

getReps(zip);

//////////////////////////////
// Their votes

function voteData(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);

    for (var i = 0; i < info.results.length; i++) {
      console.log("----------------------------------------")
      if ("bill" in info.results[i]) {
        console.log("Bill ID: " + info.results[i].bill.bill_id)
        console.log("Bill URL: " + info.results[i].bill.urls.govtrack)
        console.log("Bill Title: " + info.results[i].bill.official_title)
        console.log("Rep's vote: " + info.results[i].voter_ids.A000055)
      }
      else {
        console.log("No associated bill for this vote.")
      }

    }

  }
  else {
    console.log("Something went wrong here...");
  }
}

var voteID = 'A000055';
options.url = 'https://congress.api.sunlightfoundation.com/' + 'votes?fields=voter_ids,question,bill&voter_ids.' + voteID + '__exists=true&bill_id__exists=true&vote_type=passage';
request(options, voteData);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/representatives', representative)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function () {
  // This function is run when the app starts up.
  console.log('Server is listening on 3000')
})

module.exports = app;
