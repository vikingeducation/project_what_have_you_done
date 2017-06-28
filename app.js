"use strict";

const request = require("request");
const _       = require("lodash");

// Returns legislator info related to specified zipcode
function legislatorInfoByZipCode(zipcode) {
  return new Promise(function(resolve, reject) {
    let apiRequestLoc = "https://congress.api.sunlightfoundation.com/legislators/locate?zip=" + zipcode.toString();
    request(apiRequestLoc, function(error, response, body) {
      // Print error if occured
      if(error){
        reject(error);
      }

      // Print response status code if recieved
      console.log("statusCode: ", response && response.statusCode);

      // Make an array to store zipcode legislators
      let legislatorArray = [];

      // Store body information into legislatorArray (organized)
      bodyStats(JSON.parse(body), legislatorArray);

      // sort the legislatorArray into house and senate for later use
      let chamberSortedArray = sortLegislators(legislatorArray);
      resolve(chamberSortedArray);
      //let houseArray = chamberSortedArray[0];
      //let senateArray = chamberSortedArray[1];
    });
  });
};



// function for find out info with body (legislator info)
function bodyStats(body, legislatorArray){
  _.each(body.results, function(value, key){
    let legislator = new Legislator(
      value.first_name,
      value.last_name,
      value.party,
      value.chamber,
      value.bioguide_id,
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


function billInfoRequest(bioguide_id) {
  return new Promise(function(resolve, reject) {
    // This will get bill_id and vote (yea or nay) for recent bills voted on
    let apiRequestBillPartial = "https://congress.api.sunlightfoundation.com/votes?fields=voters." +
    bioguide_id + ".vote" + ",bill_id";

    request(apiRequestBillPartial, function(error, response, bodyBillsPartial) {
      if(error){
        reject(error);
      }

      // Print response status code if recieved
      console.log("statusCode: ", response && response.statusCode);

      // Make 2 arrays:
      // 1st for initial partial bill info (bill_id and vote) => recBillsArrayPartial
      // 2nd for partial bill info, official_title, and url (urls.govtrack) => recBillsArrayComplete

      let recBillsArrayPartial = [];

      // Print html for body (JSON response)
      billStatsPartial(JSON.parse(bodyBillsPartial), recBillsArrayPartial, bioguide_id);

      resolve(recBillsArrayPartial);
    });
  });
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
}

// Constructor for billPartial (bill_id and vote in regars to bill_id)
function BillPartial(bill_id, vote) {
  this.bill_id = bill_id;
  this.vote = vote;
}

// Extract rest of info from legislator bills
function getCompleteBill(billPartial) {
  return new Promise((resolve, reject) => {
    let apiRequestBillRest = "https://congress.api.sunlightfoundation.com/bills?bill_id=" + billPartial.bill_id;
    request(apiRequestBillRest, function(error, response, bodyBillsRest) {
      if(error) {
        reject(error);
      }

      let completeBill = billStatsComplete(billPartial, JSON.parse(bodyBillsRest).results[0]);
      //console.log(completeBill);
      resolve(completeBill);
    });
  })
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


////////////////////  TESTS ///////////////////////////
// TEST 1: Retrieve legislator info and display
// WORKS!!!!
/*
let testZip = legislatorInfoByZipCode("65201")
.then((result) => {
  console.log(result);
});
*/

// Test 2: Retrieve bill info and display
// WORKS!!!
/*
let testLegislator = billInfoRequest("H001053")
.then(
  (result) => Promise.all(result.map(
    (value) => {
      return getCompleteBill(value);
    }
  ))
)
.then((result) => {
  console.log(result);
});
*/
