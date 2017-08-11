var request = require('sync-request');

var zipCode = '21111';

var options = {
  url: 'https://congress.api.sunlightfoundation.com/legislators/locate?zip=' + zipCode
}

class Legislator {
  constructor(bioguideId, chamber, name, email, website, birthday, phone, twitter, facebook) {
    this.bioguideId = bioguideId,
    this.chamber = chamber,
    this.name = name,
    this.email = email,
    this.website = website,
    this.birthday = birthday,
    this.phone = phone,
    this.twitter = twitter,
    this.facebook = facebook,
    this.photo = "https://theunitedstates.io/images/congress/450x550/" + bioguideId + ".jpg"
  }
}

const legislators = [];

function callbackNames(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    for (x in info.results){
      legislators[x] = new Legislator(
        info.results[x].bioguide_id, info.results[x].chamber, info.results[x].title + " " + info.results[x].first_name + " " + info.results[x].middle_name + " " + info.results[x].last_name, info.results[x].oc_email, info.results[x].website, info.results[x].birthday, info.results[x].phone, info.results[x].twitter_id, info.results[x].facebook_id
      );
    }
    //console.log(legislators);
  }
  else {
    console.log(response.statusCode);
    console.log(response.body);
  }
}

request(options, callbackNames);

module.exports = legislators;
