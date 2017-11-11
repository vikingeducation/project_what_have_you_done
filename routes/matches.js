var express = require('express');
var router = express.Router();
var request = require('request')
var repname, repphotos, repparty,senname,senphotos,senparty
const Members=require('../legs/members')







	function googleInf(address) {
	var i =0;
	var url = `https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBODL8SdaUpAyGa-qIzcigjCZgZUhSkn2k&address=${address}&roles=legislatorUpperBody&fields=officials(name,party, photoUrl)`
  request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
  	var obj = JSON.parse(body)
  	while (i< obj.officials.length){
    senname=obj.officials[i].name
  	senparty=obj["officials"][i].party
  	senphotos=obj["officials"][i].photoUrl	
  	members(senname,senparty,senphotos);
  }
  i++
}
  	  else {
	console.log(error)
}
});
}
function googleInf2(address){
var j = 0; 
var url = `https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBODL8SdaUpAyGa-qIzcigjCZgZUhSkn2k&address=${address}&roles=legislatorlowerBody&fields=officials(name,party, photoUrl)`
  request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
  	var obj1 = JSON.parse(body)
  	while (j< obj1.officials.length){
    repname=obj.officials[i].name
  	repparty=obj["officials"][i].party
  	repphotos=obj["officials"][i].photoUrl	
  }
  j++
  	}  else {
	console.log(error)
}
});
  
}

router.get("/details", function(req,res,next){
	res.render('details', {});



})
module.exports = router
