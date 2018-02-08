var request = require("request");

var executeUSGithubRequest = function(officials, callback) {

  var options = {
    method: 'GET',
    url: 'https://theunitedstates.io/congress-legislators/legislators-social-media.json',
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var APIerr = null;
    if (response.statusCode !== 200 ) {
      APIerr = `Invalid API Response: ${body}`;
      callback(error, APIerr, null);
    } else {
        var obj = JSON.parse(body);

        // For each object in the officials array, find the matching
        // 'official_full' property and assign it to a new bioID in
        // the appropriate officials object

        var i;
        var j;
        for(i = 0; i <= (officials.length - 1); i++) {
          for(j = 0; j <= obj.length; j++) {
            if((officials[i].facebook) && (obj[j].social.facebook)){
              if(officials[i].facebook === obj[j].social.facebook.toLowerCase()) {
                officials[i].bioID = obj[j].id.bioguide;
                break;
              }
            } else if((officials[i].twitter) && (obj[j].social.twitter)) {
              if(officials[i].twitter ===  obj[j].social.twitter.toLowerCase()) {
                officials[i].bioID = obj[j].id.bioguide;
                break;
              }
            } else if((officials[i].youtube) && (obj[j].social.youtube)) {
              if(officials[i].youtube === obj[j].social.youtube.toLowerCase()) {
                officials[i].bioID = obj[j].id.bioguide;
                break;
              }
            }
          }
        }

        callback(error, APIerr, officials);
      }
    });

};


var MEofficials = [ { name: 'Susan M. Collins',
    party: 'Republican',
    siteURL: [ 'https://www.collins.senate.gov/' ],
    photoURL: 'http://bioguide.congress.gov/bioguide/photo/C/C001035.jpg',
    facebook: 'susancollins',
    twitter: 'senatorcollins',
    youtube: 'senatorsusancollins' },
  { name: 'Angus S. King Jr.',
    party: 'Independent',
    siteURL: [ 'http://www.king.senate.gov/' ],
    photoURL: 'http://king.senate.gov/imo/media/image/Senator-King-Official-thumb.png',
    facebook: 'senatorangusskingjr',
    twitter: 'senangusking',
    youtube: 'senatorangusking' },
  { name: 'Chellie Pingree',
    party: 'Democratic',
    siteURL: [ 'http://pingree.house.gov/' ],
    photoURL: 'http://bioguide.congress.gov/bioguide/photo/P/P000597.jpg',
    facebook: 'chelliepingree',
    twitter: 'chelliepingree',
    youtube: 'congresswomanpingree' } ]


executeUSGithubRequest(MEofficials, (error, APIerr, officialArray) => {
  if (error) {throw err;}
  if (APIerr) {
    console.log(APIerr);
  } else {
    console.log(officialArray);
  }
});


module.exports = {
  executeUSGithubRequest
}
