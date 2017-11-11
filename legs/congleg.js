'use strict';

class VoteDet1 {
 
 constructor(billnumb,billtitle,billposit) {
   this.billnumb = billnumb;
   this.billtitle = billtitle;
   this.billposit = billposit;
 
 }
}
 class VoteDet2 { 
 	constructor(missed,total,election){
   this.missed = missed;
   this.total = total;
   this.election = election;
   
 }

}




var voteOb1 = [];
var voteOb2 = [];

module.exports = {
 voteOb1,
 voteOb2,
 VoteDet1,
 VoteDet2,
};
