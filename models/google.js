var request = require("request");
var keys = require("C:/Users/Jared/Modules/Cles/items");

// Retrieves basic information about 
// Necessary because part of original API shut down
var executeGoogleRequest = (line1, city, state, zip, callback) => {

  var address = `${line1} ${city} ${state} ${zip}`;
  var officialArray = [];
  var senateIndices = [];
  var houseIndices = [];
  var indexArray = [];

  // Options object, which gets passed to request call
  var options = {
    method: 'GET',
    url: 'https://www.googleapis.com/civicinfo/v2/representatives',
    qs:
     { address: address,
       includeOffices: 'true',
       levels: 'country',
       key: keys.google,
       fields: 'offices(name,officialIndices),officials(name,party,urls,photoUrl,channels)' },
    headers:
     { 'postman-token': keys.postmanToken,
       'cache-control': 'no-cache',
       authorization: 'Basic ' + keys.googleBasic } };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);


    var APIerr = null;
    if (response.statusCode !== 200 ) {
      APIerr = `Invalid API Response: ${body}`;
      callback(error, APIerr, null);

    } else {
      // Parse response 
      var obj = JSON.parse(body);

      // For each INDEX in obj.offices - unknown quantity
      var i = 0;
      
      while (i < (obj.offices.length)) {
        // If the rep is in the Senate or House, add them to
        // their respective arrays
        if(obj['offices'][i]['name'] === "United States Senate") {
          senateIndices = obj['offices'][i]['officialIndices'];
          i++;

        } else if (obj['offices'][i]['name'].substring(0, 19) === "United States House") {
          houseIndices = obj['offices'][i]['officialIndices'];
          i++;

        } else {
          i++;
        }
      }
      indices = senateIndices.concat(houseIndices);

      // For each index in indices, go to officials[index] and grab info
      indices.forEach(function(index) {
        var officialInfo = {
          name: obj.officials[index].name,
          party: obj.officials[index].party,
          siteURL: obj.officials[index].urls,
          photoURL: obj.officials[index].photoUrl,
          channels: obj.officials[index].channels
        }


        // Parse social media elsewhere?
        // Get Twitter info if available, otherwise get FB info
        var i;
        for(i = 0; i < officialInfo.channels.length; i++) {
          if(officialInfo.channels[i].type === "Twitter") {
            officialInfo.twitter = obj.officials[index].channels[i].id.toLowerCase();
          } else if(officialInfo.channels[i].type === "Facebook") {
            officialInfo.facebook = obj.officials[index].channels[i].id.toLowerCase();
          } else if(officialInfo.channels[i].type === "YouTube") {
            officialInfo.youtube = obj.officials[index].channels[i].id.toLowerCase();
          }
        }
        // Delete channels property from officialInfo
        // It's now unneccesary
        delete officialInfo.channels;
        // Push each official object into an array
        officialArray.push(officialInfo);
      });

      callback(error, APIerr, officialArray);
    }

  });
};

module.exports = {
  executeGoogleRequest
}
