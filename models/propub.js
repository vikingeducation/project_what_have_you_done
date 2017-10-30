var request = require("request");
var keys = require("C:/Users/Jared/Modules/Cles/items");

// officials is the object the other two apis have dealt with
var executeProPubRequest = (officials, callback) => {

  // for each official, execute the request and collect information

  var options = { method: 'GET',
    url: "https://api.propublica.org/congress/v1/members/" + officials.bioID + "/votes.json",
    headers:
     { 'x-api-key': keys.proPub }
  };



  request(options, function(error, response, body) {
    if (error) throw new Error(error);


    var APIerr = null;
    if (response.statusCode !== 200 ) {
      APIerr = "Invalid API Response";
    }

    var obj = JSON.parse(body);


    callback(APIerr, officialArray);
  });

};

module.exports = {
  executeGoogleRequest
}
