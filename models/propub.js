var request = require("request");
var keys = require("C:/Users/Jared/Modules/Cles/items");

// officials is the object the other two apis have dealt with
var executeProPubRequest = (officials, callback) => {

  // for each official, execute the request and collect information
  var i;
  for(i = 0; i <= (officials.length - 1); i++) {
    var options = {
      method: 'GET',
      url: "https://api.propublica.org/congress/v1/members/" + officials[i].bioID + "/votes.json",
      headers: { 'x-api-key': keys.proPub }
    };
    console.log(options.url);

    request(options, function(error, response, body) {
      if (error) throw new Error(error);

      var APIerr = null;
      if (response.statusCode !== 200 ) {
        APIerr = "Invalid API Response";
      }

      var obj = JSON.parse(body);
      console.log(officials[i].name);
      //officials[i]['chamber'] = obj.results.chamber;
      /*
      results.member_id -- member id
      results.votes.chamber - House or Senate
      results.votes.bill.number -- bill number
      results.votes.bill.title -- name of bill (usually long, more like description)
      results.votes.description -- more like name
      results.result -- whether it passed or failed
      results.date -- date of vote
      results.position -- specific members position
      */

      //callback(APIerr, officials);
    });

  }



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

executeProPubRequest(MEofficials, (APIerr, officialArray) => {
  if (APIerr) {
    console.log(APIerr);
  } else {
    console.log(officialArray);
  }
});

module.exports = {
  executeProPubRequest
}
