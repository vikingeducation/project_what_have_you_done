"use strict";

const request = require("request");
const _       = require("lodash");

/*
function zipcodeLegislatorRequest(zipcode){
  let apiRequestLoc = "https://congress.api.sunlightfoundation.com/legislators/locate?zip=" + zipcode.toString();
  console.log(apiRequestLoc);
  request(apiRequestLoc, function(error, response, body) {

    // Print error if occured
    console.log("error: ", error);

    // Print response status code if recieved
    console.log("statusCode: ", response && response.statusCode);

    // Make an array to store zipcode legislators
    let legislatorArray = [];

    // Print html for body (JSON response)
    bodyStats(JSON.parse(body), legislatorArray);

    // sort the legislatorArray into house and senate for later use
    let chamberSortedArray = sortLegislators(legislatorArray);
    let houseArray = chamberSortedArray[0];
    let senateArray = chamberSortedArray[1];

    printLegislatorInfo(houseArray);
    printLegislatorInfo(senateArray);

  });
}





// function for find out info with body
function bodyStats(body, legislatorArray){
  _.each(body.results, function(value, key){
    let legislator = new Legislator(
      value.first_name,
      value.last_name,
      value.party,
      value.chamber,
      value.bioguide_id
      value.phone,
      value.website
    );
    legislatorArray.push(legislator);
  });
}

// Constructor for legislator (phone_number, website)
function Legislator(first_name, last_name, party, chamber, bioguide_id, phone, website, picture){
  this.first_name = first_name;
  this.last_name = last_name;
  this.party = party;
  this.chamber = chamber;
  this.bioguide_id = bioguide_id;
  this.phone = phone;
  this.website = website;
  this.picture = "https://theunitedstates.io/images/congress/original/" + bioguide_id + ".jpg";
}

// Prints a legislators info to make sure logged properly
function printLegislatorInfo(legArray){
  _.each(legArray, function(value) {
    console.log("Name: " + value.first_name + " " + value.last_name);
    console.log("Party: " + value.party);
    console.log("Chamber: " + value.chamber);
    console.log("Bioguide_id: " + value.bioguide_id);
    console.log();
  });
}



// Sorts legislator info into house and senate
function sortLegislators(legislatorArray){
  // int arrays
  let legArrayHouse = [], legArraySenate = [];

  _.each(legislatorArray, function(value){
    if(value.chamber === "house"){
      legArrayHouse.push(value);
    } else if(value.chamber === "senate"){
      legArraySenate.push(value);
    }
  });
  return [legArrayHouse, legArraySenate];
}

//zipcodeLegislatorRequest(65201);
//
//
//
//
//
//
//
*/

/*
name = vicky hartzler
zipcode = 65201
bioguide_id = H001053
party = R
HorS = House
 */


 function billInfoRequest(bioguide_id){

   // This will get bill_id and vote (yea or nay) for recent bills voted on
   let apiRequestBillPartial = "https://congress.api.sunlightfoundation.com/votes?fields=voters." +
   bioguide_id + ".vote" + ",bill_id";

   request(apiRequestBillPartial, function(error, response, bodyBillsPartial) {
     // Print error if occured
     console.log("error: ", error);

     // Print response status code if recieved
     console.log("statusCode: ", response && response.statusCode);

     /*
     Make 2 arrays:
     1st for initial partial bill info (bill_id and vote) => recBillsArrayPartial
     2nd for partial bill info, official_title, and url (urls.govtrack) => recBillsArrayComplete
     */
     let recBillsArrayPartial = [];
     let recBillsArrayComplete = [];

     // Print html for body (JSON response)
     billStatsPartial(JSON.parse(bodyBillsPartial), recBillsArrayPartial, bioguide_id);
     

     // Extract rest of information for the bills of legislator
     _.each(recBillsArrayPartial, function(value) {
       let apiRequestBillRest = "https://congress.api.sunlightfoundation.com/bills?bill_id=" + value.bill_id;
       console.log(apiRequestBillRest);
       request(apiRequestBillRest, function(error, response, bodyBillsRest) {
         // Print error if occured
         console.log("error: ", error);

         // Print response status code if recieved
         console.log("statusCode: ", response && response.statusCode);

         // Make final bill object and push it into complete array bills array
         if(!error){
           let billComplete = billStatsComplete(value, JSON.parse(bodyBillsRest).results[0]);
           recBillsArrayComplete.push(billComplete);
         }
       });
     });
   });
 }

function billStatsComplete(billPartial, bodyBillsRest) {
  let billComplete = new BillComplete(
    billPartial.bill_id,
    billPartial.vote,
    bodyBillsRest.official_title,
    bodyBillsRest.urls.govtrack
  );
  return billComplete;
}

// Constructor for BillComplete (bill_id, vote, official_title, url)
function BillComplete(bill_id, vote, official_title, url) {
  this.bill_id = bill_id;
  this.vote = vote;
  this.official_title = official_title;
  this.url = url;
}

// function for find out info with body
function billStatsPartial(bodyBillsPartial, recBillsArrayPartial, bioguide_id) {

  // set BillInfo to the meat of our api (contains bill_info and vote)
  let billInfo = bodyBillsPartial.results;

  // Add all bills and corresponding votes to recBillsArrayPartial
  for(let i = 0; i < billInfo.length; i++) {
    if(billInfo[i].bill_id !== undefined){
      let billPartial = new BillPartial(
        billInfo[i].bill_id,
        billInfo[i].voters[bioguide_id].vote
      );
      // add the new billPartial to our array
      recBillsArrayPartial.push(billPartial);
    }
  }
};


// Constructor for billPartial (bill_id and vote in regars to bill_id)
function BillPartial(bill_id, vote) {
  this.bill_id = bill_id;
  this.vote = vote;
}

/*
// Constructor for legislator (phone_number, website)
function Bill(bill_id, vote, url, official_title){
  this.bill_id = bill_id;
  this.vote = vote;
  this.url = url;
  this.official_title = official_title;
}

// function for find out info with body
function billStats(bodyBills, recBillsArray){
  _.each(bodyBills.results, function(value, key){
    if(value.bill_id !== undefined){
      // There's a bill id so we need to query the rest of the bill info
      let restInfo = "https://congress.api.sunlightfoundation.com/bills?bill_id=" + value.bill_id;

      // We make one more request for rest of info (official_title, urls.govtrack)
      request(restInfo, function(error, response, body) {
        console.log("error: ", error);
        console.log("statusCode: ", response && response.statusCode);

        let billObject = JSON.parse(body);

        let bill = new Bill(
          value.bill_id,
          value.vote,
          billObject.urls.govtrack,
          billObject.official_title
        );
        recBillsArray.push(legislator);
      });
    }
  });
}


*/
