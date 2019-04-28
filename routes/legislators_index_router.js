var express = require('express');
var router = express.Router();
var {SunlightApi} = require('../api/sunlight_api');

var getMembers = function(legislators, position) {
  return members = legislators.filter(function(legislator){ return legislator.chamber === position});
};

router.get('/', function(req, res, next) {
  var zip = req.query.zip;
  var api = new SunlightApi();

  // make a call to the api to get legislators for this zip.
  // this is the action of the callback referenced api function
  api.getLegislators(zip, function(legislators){
    // separate results by house/senate
    var houseMembers = getMembers(legislators, 'house');
    var senateMembers = getMembers(legislators, 'senate');
    // render this info in the view
    res.render('legislators_index', { title: 'Legislators by zip', house_members: houseMembers, senate_members: senateMembers, zip_numbers: zip.split('') });
  });
});

module.exports = router
