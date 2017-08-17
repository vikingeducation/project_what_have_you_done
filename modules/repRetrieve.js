var request = require('request');

var options = function(routingCode) {
  if (routingCode.length != 5){
    return {
        url: `https://congress.api.sunlightfoundation.com/legislators?bioguide_id=${routingCode}`
      }
  }
  else {
    return {
      url: `https://congress.api.sunlightfoundation.com/legislators/locate?zip=${routingCode}`
    }
  }
}

class Legislator {
  constructor(bioguideId, chamber, name, email, website, birthday, phone, twitter, facebook, party) {
    this.bioguideId = bioguideId,
    this.chamber = chamber,
    this.name = name,
    this.email = email,
    this.website = website,
    this.birthday = birthday,
    this.phone = phone,
    this.twitter = twitter,
    this.facebook = facebook,
    this.largePhoto = "https://theunitedstates.io/images/congress/450x550/" + bioguideId + ".jpg",
    this.smallPhoto = "https://theunitedstates.io/images/congress/225x275/" + bioguideId + ".jpg",
    this.party = party;
  }
}

var legislators = [];

function callbackNames(body) {
  var info = JSON.parse(body);
  for (x in info.results){
    if (info.results[x].middle_name === null) {
      info.results[x].middle_name = "";
    }
    legislators[x] = new Legislator(
      info.results[x].bioguide_id, info.results[x].chamber, info.results[x].title + " " + info.results[x].first_name + " " + info.results[x].middle_name + " " + info.results[x].last_name, info.results[x].oc_email, info.results[x].website, info.results[x].birthday, info.results[x].phone, info.results[x].twitter_id, info.results[x].facebook_id, info.results[x].party
    );
    if (legislators[x].middle_name === 'null') {
      legislators[x].middle_name = "";
    }
    if (legislators[x].chamber ==='senate') {
      legislators[x].senateChamber = true;
    }
    else {
      legislators[x].houseChamber = true;
    }
    if (legislators[x].party === 'R') {
      legislators[x].party = 'Republican';
    }
    else if (legislators[x].party === 'D'){
      legislators[x].party = 'Democratic'
    }
    else {
      legislators[x].party = 'Independant'
    }
  }
}

module.exports = function (routingCode) {
  legislators = [];

  return new Promise(function(resolve, reject){
      request(options(routingCode), function (err, response, body) {
          if (err) {
            reject(err);
          }
          try {
              callbackNames(body);
              resolve(legislators);
          } catch(err) {
              reject(err);
          }
      });
    });
  }
