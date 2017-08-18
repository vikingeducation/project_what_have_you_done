var legislators_by_zip = require('../lib/legislators_by_zip');


class Legislator {
  constructor(bioguide_id, name, chamber, party, phone, website, imageUrl) {
    this.bioguide_id = bioguide_id,
    this.name = name,
    this.chamber = chamber,
    this.party = this.partyConverter(party),
    this.phone = phone,
    this.website = website,
    this.imageUrl = imageUrl
  };

  partyConverter(apiParty){
    switch (apiParty) {
      case 'D':
        return 'Democrat'
        break;
      case 'R':
        return 'Republican'
        break;
      case 'G':
        return 'Green'
        break;
      case 'I':
        return 'Independent'
        break;
      default:
        return 'Party Unknown'
    }
  };
} // close Legislator

const LEGISLATORS = []
legislators_by_zip.results.forEach(function(leg){
  LEGISLATORS.push(
    new Legislator(
      leg.bioguide_id,
      `${leg.first_name} ${leg.last_name}`,
      leg.chamber,
      leg.party,
      leg.phone,
      leg.website,
      `https://theunitedstates.io/images/congress/225x275/${leg.bioguide_id}.jpg`
      )
  );
});

// return the class for use in other files
module.exports = {
  Legislator,
  LEGISLATORS
};