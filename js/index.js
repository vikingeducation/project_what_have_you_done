request = require("request");

zip = "";
legislators = [];

var options = {
  url: "https://congress.api.sunlightfoundation.com/legislators/locate?zip=11216",
  headers: {
    "user-agent": "request"
  }
};
function parse(data) {
  var data = JSON.parse(data).results;
  data.forEach(function(item){
    var temp = [
      item["first_name"],
      item["last_name"],
      item["chamber"]
    ]
    legislators.push(temp);
  });
}
function byZip(error, response, body){
  if(!error && response.statusCode == 200) {
    parse(body);
  } else {
    console.log(error);
  }
}

request(options, byZip);
