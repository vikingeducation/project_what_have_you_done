var request = require("request");

// officials parameter is array of information from last request 
// This API call retrieves each representative's bioID based
// on social media account information. This info is checked 
// through three possible social media routes - currently
// all representatives have one of the three
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

module.exports = {
  executeUSGithubRequest
}
