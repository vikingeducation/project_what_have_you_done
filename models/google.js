var request = require("request");
var keys = require("C:/Users/Jared/Modules/Cles/items");


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
       key: keys.google },
    headers:
     { 'postman-token': keys.postmanToken,
       'cache-control': 'no-cache',
       authorization: 'Basic ' + keys.googleBasic } };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);


    var APIerr = null;
    if (response.statusCode !== 200 ) {
      APIerr = "Invalid API Response";
    }

    var obj = JSON.parse(body);
    console.log(obj);
    // For each INDEX in obj.office
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
        photoURL: obj.officials[index].photoUrl
      }
      // Push each official object into an array
      officialArray.push(officialInfo);
    });

    callback(APIerr, officialArray);
  });

};

module.exports = {
  executeGoogleRequest
}
