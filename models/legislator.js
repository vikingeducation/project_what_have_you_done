//a nifty module that handles legislator data

class Legislator {
  //grab JSON data and pass into .this variables for usee:
  constructor(data){
    this.bioguide_id = data.bioguide_id;
    this.first_name = data.first_name;
    this.middle_name = data.middle_name;
    this.last_name = data.last_name;
    this.name = this.name(data.first_name, data.last_name);
    this.image = this.image(data.bioguide_id);
    this.oc_email = data.oc_email;
    this.phone = data.phone;
    this.website = data.website;
    this.twitter_id = data.twitter_id;
    this.chamber = data.chamber;
    this.party = data.party;
  }

  image(bioguide_id){
    //this url has an image for all representatives respective bioguide_id
    return `https://theunitedstates.io/images/congress/original/${bioguide_id}.jpg`;
  }

  name(first_name, last_name){
    return `${first_name} ${last_name}`
  }

  getChamber(){

  }

}//END Legislator

module.exports = Legislator;
