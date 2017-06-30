var http = require('http');
var fs = require('fs');


const port = process.env.PORT || '3000'
var host = 'localhost';
const myModule = require('./index.js');
var modu = myModule.hello();

var server = http.createServer(function(req, res) {
  fs.readFile('./index.html', 'utf8', function(err, data) {
    if (err) {
      res.writeHead(404);
      res.end("404 Not Found");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/html"
      });
      res.end(data);
    }
  });
});


server.listen(port, host, function() {
  console.log(`Listening at http://${ host }:${ port }`);
});
var ZipCodeSearch = function(){

}
