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
      APIerr = "Invalid API Response";
    }

    var obj = JSON.parse(body);

    // For each object in the officials array, find the matching
    // 'official_full' property and assign it to a new bioID in
    // the appropriate officials object

    var i;
    var j;
    for(i = 0; i <= (officials.length - 1); i++) {
      console.log("i is:" + i);
      for(j = 0; j <= obj.length; j++) {
        console.log("j is:" + j);
        // .toLowerCase() => undefined???
        if(officials[i]['twitter']=== obj[j]['social']['twitter']) {
          officials[i]['bioID'] = obj[j]['id']['bioguide'];
          break;
        }
      }
    }

    callback(APIerr, officials);

  });

};

var MEofficials = [
  { name: 'Susan M. Collins',
    party: 'Republican',
    siteURL: [ 'https://www.collins.senate.gov/' ],
    photoURL: 'http://bioguide.congress.gov/bioguide/photo/C/C001035.jpg',
    twitter: 'SenatorCollins' },
    { name: 'Angus S. King Jr.',
    party: 'Independent',
    siteURL: [ 'http://www.king.senate.gov/' ],
    photoURL: 'http://king.senate.gov/imo/media/image/Senator-King-Official-thumb.png',
    twitter: 'SenAngusKing' },
  { name: 'Chellie Pingree',
    party: 'Democratic',
    siteURL: [ 'http://pingree.house.gov/' ],
    photoURL: 'http://bioguide.congress.gov/bioguide/photo/P/P000597.jpg',
    twitter: 'ChelliePingree' }
];

executeUSGithubRequest(MEofficials, (APIerr, officialArray) => {
  if (APIerr) {
    console.log(APIerr);
  } else {
    console.log(officialArray);
  }
});

module.exports = {
  executeUSGithubRequest
}
