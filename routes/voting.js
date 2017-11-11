var express = require('express');
var router = express.Router();
var request = require('request')
var Vote1 =require('../legs/congleg').VoteDet1
var Vote2 = require('../legs/congleg').VoteDet2
var votea1 = require('../legs/congleg').voteOb1
var votea2 = require('../legs/congleg').voteOb2
var propub = require('../API/propub').RepMemb;
var propub1 = require('../API/propub').Rep1Memb;




router.get('/:name', function(req,res,next){
var name = req.params.name;
var list = new propub(name);
list.stats(function(obj){
var lname= name.split(" ").slice(-1)[0];
console.log(lname)
var i = 0;
if (votea2.length > 0) {
        votea2 = [];
      }
      console.log(obj.length)
    while (i < obj.length) {
      
      if (obj[i].last_name === lname){
             identification = obj[i].id;
        var missedvotes = obj[i].missed_votes_pct;
        var totalvotes = obj[i].total_votes;
        var nextelec = obj[i].next_election
    votea2.push(new Vote2 (missedvotes,totalvotes,nextelec))
      
      
      
    }
 i++
  }
  var moreDet = new propub1(identification)
console.log(moreDet)
moreDet.stats1(function(obj){
  var j = 0;
  if (votea1.length > 0) {
        votea1 = [];
      }
while (j < obj.length) {
    var billNumb = obj[j].bill.bill_id;
    var billTitle = obj[j].description
    var votePosition = obj[j].position
    votea1.push(new Vote1 (billNumb,billTitle,votePosition))
    j++

   
}
res.render('voting', {votea1, votea2})
})

});

})



module.exports = router
