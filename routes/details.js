var params = require('express-route-params')
var express = require('express');
const bodyParser = require('body-parser'); 

var router = express.Router();
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false })); 
var request = require('request')
const querystring = require('querystring');  
var sens=require('../legs/members').Sens
var reps = require('../legs/members').Reps
var sensa=require('../legs/members').sens
var repsa = require('../legs/members').reps
var google = require('../API/googlecivic')

router.get("/", function(req,res,next){
var address = req.query.zipadd;
var low = new google(address)
var up = new google(address)
low.lowerBod(function(obj){
var j = 0;
if (repsa.length > 0) {
      repsa = [];
    };
if (typeof obj === "undefined"){
var repname="Please go back and enter a complete address";
      var repparty="";
      var repphotos="";
      repsa.push(new reps(repname,repparty,repphotos))
    } else {
    while (j < obj.length){
    var repname=obj[j].name
    var repparty=obj[j].party
    var repphotos=obj[j].photoUrl
    repsa.push(new reps(repname,repparty,repphotos))  
    j++
  }
}
})
  up.upperBod(function(obj){
var i = 0;
if (sensa.length > 0) {
      sensa = [];
    };
while (i < obj.length){
    var senname=obj[i].name
    var senparty=obj[i].party
    var senphotos=obj[i].photoUrl
    sensa.push(new sens(senname,senparty,senphotos))  
    i++
   
  }
 res.render('details', {repsa,sensa}) 
   })


});





module.exports = router
