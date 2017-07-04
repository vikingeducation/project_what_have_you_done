"use strict";

const request = require("request");
const _       = require("lodash");


// Returns legislator info by bioguide_id
function legislatorInfo(bioguide_id) {
  return new Promise(function(resolve, reject) {
    let apiRequestLoc = "https://congress.api.sunlightfoundation.com/legislators?bioguide_id=" + bioguide_id;
    request(apiRequestLoc, function(error, response, body) {

    if(error) {
      reject(error);
    }

    let info = JSON.parse(body).results[0];

    let leg = {
      first_name: info.first_name,
      last_name: info.last_name,
      phone: info.phone,
      website: info.website,
      picture: "https://theunitedstates.io/images/congress/original/"+info.bioguide_id+".jpg"
    }

    resolve(leg);
    });
  });
}


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
    if(party === 'R'){
      this.party = "Republican";
    } else {
      this.party = "Democrat";
    }

    this.first_name = first_name;
    this.last_name = last_name;
    this.chamber = chamber;
    this.bioguide_id = bioguide_id;
    this.phone = phone;
    this.website = website;
    this.picture = "https://theunitedstates.io/images/congress/original/" + bioguide_id + ".jpg";
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
};


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

function billInfoRequest(bioguide_id) {
  return new Promise(function(resolve, reject) {
    let main = `https://congress.api.sunlightfoundation.com`;
    let fields = `fields=bill.bill_id,bill.official_title,voters.${bioguide_id}.vote,bill.urls.govtrack`
    let apiRequest = `${main}/votes?voter_ids.${bioguide_id}__exists=true&bill.bill_id__exists=true&${fields}`
    console.log(apiRequest);

    request(apiRequest, function(error, response, body) {
      if(error){
        reject(error);
      }

      let temp = JSON.parse(body).results;
      let billsComplete = [];
      //console.log(billsComplete[0].bill.bill_id);

      for(let i = 0; i < temp.length; i++) {
        //console.log(temp[i].bill.bill_id);
          billsComplete[i] = {
            bill_id:        temp[i].bill.bill_id,
            official_title: temp[i].bill.official_title,
            website:        temp[i].bill.urls.govtrack,
            vote:           temp[i].voters[bioguide_id].vote
          }
      }

      resolve(billsComplete);
    })
  });
  // Constructor for billPartial (bill_id and vote in regars to bill_id)
  function Bill(bill_id, official_title, website, vote) {
    this.bill_id = bill_id;
    this.official_title = official_title;
    this.website = website;
    this.vote = vote;
  }
}

const legislatorAPI = {
  legislatorInfoByZipCode,
  billInfoRequest,
  legislatorInfo
}

// Export Data
module.exports = legislatorAPI;
