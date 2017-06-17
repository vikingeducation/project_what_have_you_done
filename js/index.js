request = require("request");
http = require("http");
fs = require("fs");
qs = require("querystring");
Promise = require("promise");

var zip = "";
var legislators = [];
var house = "<h2>House</h2><p>";
var senate = "<h2>Senate</h2><p>";
var total = "";

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
  for(var i = 0; i < legislators.length; i++) {
    if(legislators[i][2] == "house") {
      house += legislators[i][0] + " ";
      house += legislators[i][1] + "<br />";
    } else {
      senate += legislators[i][0] + " ";
      senate += legislators[i][1] + "<br />";
    }
  }
  house += "</p>";
  senate += "</p>";
  total += house;
  total += senate;
  console.log("done");
  return total;
}

function byZip(error, response, body){
  if(!error && response.statusCode == 200) {
    var result = parse(body);
    return result;
  } else {
    console.log(error);
  }
}

var server = http.createServer(function(req, response){
  console.log("Incoming request...");
  console.log(`Requesting ${req.url}`);
  switch(req.url){
    case "/css/style.css":
      fs.readFile("css/style.css", "utf8", function(err, data){
        response.writeHead(200, {"Content-Type":"text/css"});
        response.write(data);
        response.end();
        console.log("Success")
      });
      break;
    case "/css/style.css.map":
      fs.readFile("css/style.css.map", "utf8", function(err, data){
        response.writeHead(200, {"Content-Type":"text/css"});
        response.write(data);
        response.end();
        console.log("Success")
      });
      break;
    case "/js/check.js":
      fs.readFile("js/check.js", "utf8", function(err, data){
        response.writeHead(200, {"Content-Type" : "application/javascript"});
        response.write(data);
        response.end();
        console.log("Success");
      });
      break;
    case "/":
      fs.readFile("index.html", "utf8", function(err, data){
        response.writeHead(200, {"Content-Type" : "text/html"});
        response.write(data);
        console.log("Success");
        response.end();
      });
      break;
    case "/listings":
      zip = "";
      if(req.method == "POST"){
        req.on("data", function(data){
          zip += data;
          zip = qs.parse(zip);
          zip = zip["a"] + zip["b"] + zip["c"] + zip["d"] + zip["e"];
          console.log("Gathering data for ZIP code", zip);
          options["url"] = `https://congress.api.sunlightfoundation.com/legislators/locate?zip=${zip}`;
          var promise = new Promise(function(res, rej){
            request(options, function(err, resu, body){
              res(byZip(err, resu, body));
            });
            console.log("Reqeust Promise")
          });
          promise.then(function(msg){
            console.log("Then Promise")
            fs.readFile("listings.html", "utf8", function(err, data){
              response.writeHead(200, {"Content-Type" : "text/html"});
              data = data.replace(/{{ZIP}}/, zip);
              data = data.replace(/{{CONTENT}}/, msg);
              response.write(data);
              console.log("Success");
              response.end();
            });
          });
        });
      }
      break;
  }
  console.log("Responding");
});

var options = {
  url: "",
  headers: {
    "user-agent": "req"
  }
};
var url = {
  host: "localhost",
  port: "5000",
}

server.listen(url, function(){
  console.log(`Server listening at ${url["host"]}:${url["port"]}`);
});
