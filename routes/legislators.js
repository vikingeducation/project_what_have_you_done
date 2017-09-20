const express = require('express');
const router = express.Router();
const sunlightApi = require('../api/sunlight_api');

let allMembers = function(legislators, position) {
  return members = legislators.filter(function(legislator){ return legislator.chamber === position});
};

router.get('/', function(req, res, next) {
  let zip = req.query.zip;
  let api = new sunlightApi();

  api.getLegislators(zip, function(legislators){
    // separate results by house/senate
    let houseMembers = allMembers(legislators, 'house');
    let senateMembers = allMembers(legislators, 'senate');

    res.render('legislators', 
      { 
        house_members: houseMembers, 
        senate_members: senateMembers, 
        zip_numbers: zip.split('') 
      }
    );
  });
});

module.exports = router