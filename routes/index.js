const express = require('express');
const app = express();
const request = require('request');
const fs = require('fs');
app.set('view engine', 'hbs');

app.listen(3000, function(){
  console.log("listening at port 3000");
})

app.get("/", function(req, res){
  res.render('index.hbs');
  })

var jsonData;

app.get("/states/:state", function(req, res) {
  var state = req.params.state;
  var url = "https://openstates.org/api/v1/metadata/"+state;
  request({uri: url, headers: {"X-API-KEY": "59bcba1f-e98d-45b7-a2ef-8658a3e4a56f"}}, function(error, response, body){
  jsonData = JSON.parse(body);
  })
  res.render('mystate.hbs', {state: jsonData});
})
