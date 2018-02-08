var request = require("request");
var async = require("async");
var votes = require("./votes");
var keys = require("C:/Users/Jared/Modules/Cles/items");

// officials is the object the other two apis have dealt with
var executeProPubRequest = (officials, callback) => {
  // could also put executeProPubRequest inside loop for each official
  async.forEachOf(officials, function(official, i, callbackTwo) {
    
    var options = {
      method: 'GET',
      url: "https://api.propublica.org/congress/v1/members/" + officials[i].bioID + "/votes.json",
      headers: { 'x-api-key': keys.proPub },
    };

    request(options, function(error, response, body) {
      if (error) throw new Error(error);

      var APIerr = null;
      if (response.statusCode !== 200 ) {
        APIerr = `Invalid API Response: ${body}`;
        callbackTwo(error, APIerr, null);
      } else {

        var obj = JSON.parse(body);
        // results[0] requires bracketed index
        // because it's just a big wrapper
        officials[i]['chamber'] = obj.results[0].votes[0].chamber;
        officials[i]['votes']= [];
  
        // IIFE to push votes into votes array
        let j;
        for(j = 0; j <= 4; j++) {
            let newVote = new votes.Vote(obj, j);
            officials[i]['votes'].push(newVote);
          } // closes for
        }  // closes else
      callbackTwo(error, APIerr, null);  
      }); // closes request
  // closes async
}, function(error, APIerr, officials) {
  //console.log(officials);
  console.log("done");
  callback(error, APIerr, officials);
});

  // closes executeProPubRequest
};



var MEofficials = [
  { name: 'Susan M. Collins',
    party: 'Republican',
    siteURL: [ 'https://www.collins.senate.gov/' ],
    photoURL: 'http://bioguide.congress.gov/bioguide/photo/C/C001035.jpg',
    twitter: 'SenatorCollins',
    bioID: "C001035" },
  { name: 'Angus S. King Jr.',
    party: 'Independent',
    siteURL: [ 'http://www.king.senate.gov/' ],
    photoURL: 'http://king.senate.gov/imo/media/image/Senator-King-Official-thumb.png',
    twitter: 'SenAngusKing',
    bioID: "K000383" },
  { name: 'Chellie Pingree',
    party: 'Democratic',
    siteURL: [ 'http://pingree.house.gov/' ],
    photoURL: 'http://bioguide.congress.gov/bioguide/photo/P/P000597.jpg',
    twitter: 'chelliepingree',
    bioID: 'P000597' }
];

executeProPubRequest(MEofficials, (error, APIerr, officialArray) => {
  if (error) {throw err;}
  if (APIerr) {
    console.log(APIerr);
  } else {
    console.log(officialArray);
  }
});

module.exports = {
  executeProPubRequest
}
