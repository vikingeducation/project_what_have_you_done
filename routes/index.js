const express = require('express');
const app = express();
const request = require('request');
const fs = require('fs');
const path = require('path');

app.set('view engine', 'hbs');
app.use(express.static('public'));


app.listen(product.env.PORT || 3000, function(){
  console.log("listening at port 3000");
})

app.get("/", function(req, res){
  res.render('index.hbs');
  })

app.get("/states/:state", function(req, res) {
  var stateMetadata;
  var stateBills;
  var prom1;
  var prom2;
  var state = req.params.state;
  var prom1 = new Promise(function(resolve, reject){
    var url = "https://openstates.org/api/v1/metadata/"+state;
    request({uri: url, headers: {"X-API-KEY": "59bcba1f-e98d-45b7-a2ef-8658a3e4a56f"}}, function(error, response, body){
    stateMetadata = JSON.parse(body);
    resolve(body);
    })
  })
  var prom2 = new Promise(function(resolve, reject){
    var url2 = "https://openstates.org/api/v1/bills/?state="+state+"&q="+state;
    request({uri: url2, headers: {"X-API-KEY": "59bcba1f-e98d-45b7-a2ef-8658a3e4a56f"}}, function(error, response, body){
    stateBills = JSON.parse(body);
    resolve(body);
    })
  })
  var prom3 = new Promise(function(resolve, reject){
    var url2 = "https://openstates.org/api/v1/legislators/?state="+state;
    request({uri: url2, headers: {"X-API-KEY": "59bcba1f-e98d-45b7-a2ef-8658a3e4a56f"}}, function(error, response, body){
    stateLegislators = JSON.parse(body);
    resolve(body);
    })
  })
  var prom4 = new Promise(function(resolve, reject){
    var url2 = "https://openstates.org/api/v1/committees/?state="+state;
    request({uri: url2, headers: {"X-API-KEY": "59bcba1f-e98d-45b7-a2ef-8658a3e4a56f"}}, function(error, response, body){
    stateCommittees = JSON.parse(body);
    resolve(body);
    })
  })
  Promise.all([prom1, prom2, prom3, prom4]).then(function(results){
    res.render('mystate.hbs', {meta: stateMetadata, bills: stateBills, legislators: stateLegislators, committees: stateCommittees});
  })
  .catch(function(err){
    console.log(err);
  })
})
