var request = require("request");
var votes = require("./models/votes");
var keys = require("C:/Users/Jared/Modules/Cles/items");
var async = require('async');

// officials is the object the other two apis have dealt with
// Retreive votes from Propublica API
var executeProPubRequest = (officials, indexCallback) => {
  async.map(officials,
    
    // For each official, retrieve chamber and votes 
    // Results returned to second callback 
    function(official, doneCallback) {
      var options = {
        method: 'GET',
        url: "https://api.propublica.org/congress/v1/members/" + official.bioID + "/votes.json",
        headers: { 'x-api-key': keys.proPub }
      };

      // Actual API request
      request(options, function(error, response, body) {
        if (error) throw new Error(error);
        var APIerr = null;
        // callback
        if (response.statusCode !== 200 ) {
          APIerr = `Invalid API Response: ${response}`;
          // fix
          //callback(error, APIerr, null);
        } else {
          var obj = JSON.parse(body);

          // assign chamber and init votes array 
          // results[0] requires bracketed index
          // because it's just a big wrapper
          official['chamber'] = obj.results[0].votes[0].chamber;
          official['votes']= [];

          // specifically pushing 5 votes
          let j;
            for(j = 0; j <= 4; j++) {
              (function(j) {
                let newVote = new votes.Vote(obj, j);
                official['votes'].push(newVote);
              })(j);
            }
        // closes else
        }
        
        // return completed official item
        return doneCallback(null, official);
      // closes request
      });
    // closes iterator callback
    },
  
    // callback once each item has finished
    function(err, results) {
      if(err) { console.log(err); }
      indexCallback(results);
    }
  
  // closes async.map
  );


// closes executeProPubRequest
};


// var MEofficials = [ 
// { name: 'Susan M. Collins',
// party: 'Republican',
// siteURL: [ 'https://www.collins.senate.gov/' ],
// photoURL: 'http://bioguide.congress.gov/bioguide/photo/C/C001035.jpg',
// facebook: 'susancollins',
// twitter: 'senatorcollins',
// youtube: 'senatorsusancollins',
// bioID: 'C001035' },
// { name: 'Angus S. King Jr.',
// party: 'Independent',
// siteURL: [ 'http://www.king.senate.gov/' ],
// photoURL: 'http://king.senate.gov/imo/media/image/Senator-King-Official-thumb.png',
// facebook: 'senatorangusskingjr',
// twitter: 'senangusking',
// youtube: 'senatorangusking',
// bioID: 'K000383' },
// { name: 'Chellie Pingree',
// party: 'Democratic',
// siteURL: [ 'http://pingree.house.gov/' ],
// photoURL: 'http://bioguide.congress.gov/bioguide/photo/P/P000597.jpg',
// facebook: 'chelliepingree',
// twitter: 'chelliepingree',
// youtube: 'congresswomanpingree',
// bioID: 'P000597' } ];

// executeProPubRequest(MEofficials, (officialArray) => {
//     console.log(officialArray);
// });

module.exports = {
  executeProPubRequest
};
