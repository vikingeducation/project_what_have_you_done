class Legislator {
  constructor(bioguide_id, firstName, lastName, chamber, party, phone, website, imageUrl) {
    this.bioguide_id = bioguide_id,
    this.firstName = firstName,
    this.lastName = lastName,
    this.chamber = chamber,
    this.party = party,
    this.phone = phone,
    this.website = website,
    this.imageUrl = imageUrl
  };
} // close Legislator

const LEGISLATORS = [];


// return the class for use in other files
module.exports = {
  Legislator,
  LEGISLATORS
};