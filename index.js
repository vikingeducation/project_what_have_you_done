const request = require('request')
var prompt = require('prompt');
const baseUri = "https://congress.api.sunlightfoundation.com"

// request('https://congress.api.sunlightfoundation.com/legislators/locate?zip=02139', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
// var myArr = body.split(" ");
//     console.log(myArr[1]);
//
//
//
//     console.log("last" + JSON.parse(body)[0]);
//   }
// })

class YourReps {


  repsInZip(callback, zipCode) {
    this._sendRequest("legislators/locate?zip=" + zipCode.toString(), callback)
  }

  repsID(callback, repToFind) {
    this._sendRequest("legislators?query=" + repToFind.toString(), callback)
  }

  repsVotes(callback,repID) {
    console.log("votes?voter_ids." + repID.toString() + "__exists=true");
    this._sendRequest("votes?voter_ids." + repID.toString() + "__exists=true", callback)
  }

  _sendRequest(type, callback) {
    const url = `${baseUri}/${type}`

    request(url, function(error, response, body) {
      if (!error & response.statusCode === 200) {
        callback(JSON.parse(body).results)
      }
    })
  }
}

const reps = new YourReps;
var repIDNumber = 0;
 prompt.get(['zipcode'], function (err, result) {
   if (err) { return onErr(err); }
   console.log('  Zipcode: ' + result.zipcode);
 var zip = result.zipcode;

 reps.repsInZip(function(data) {
 for(var i=0; i < data.length; i++) {
   console.log(data[i].bioguide_id);

 }

  }, zip);


})
  prompt.get(['repLastName'], function (err, result) {
    if (err) { return onErr(err); }
    console.log('  repLastName: ' + result.repLastName);
  var rep = result.repLastName;

  reps.repsID(function(data) {
console.log(data[0].bioguide_id);
repIDNumber = data[0].bioguide_id;
reps.repsVotes( function(data2) {
  for(var j=0; j < data2.length; j++) {
 //    console.log(data[i].bioguide_id);
  console.log(data2[j].roll_id)} }, repIDNumber)


   }, rep);


 })
 exports.hello = function() {
   return "Hello";
 }
 var ZipCodeSearch = function(){

   reps.repsInZip(function(data) {
   for(var i=0; i < data.length; i++) {
     console.log(data[i].bioguide_id);

   }

    }, document.getElementById("zipBox").value); 

 }



// prompt.get(['repLastName'], function (err, result) {
//     if (err) { return onErr(err); }
//     console.log('  repLastName: ' + result.repLastName);
//
//   var rep = result.repLastName;
//
// reps.repsID(function(data) {
//   console.log(data[0].bioguide_id);
//   reps.repsVotes(function(data2) {  console.log(data2);},data[0].bioguide_id)
// }, rep);}
