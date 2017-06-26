"use strict";

const request = require("request");
const _       = require("lodash");

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
    );
    legislatorArray.push(legislator);
  });

}

// Constructor for legislator
function Legislator(first_name, last_name, party, chamber, bioguide_id){
  this.first_name = first_name;
  this.last_name = last_name;
  this.party = party;
  this.chamber = chamber;
  this.bioguide_id = bioguide_id;
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

zipcodeLegislatorRequest(63017);
