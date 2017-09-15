class Legislator {

  constructor(params) {
    this.bioguide_id = params.bioguide_id,
    this.name = this.name(params.first_name, params.last_name),
    this.chamber = params.chamber,
    this.party = this.partyConverter(params.party),
    this.phone = params.phone,
    this.website = params.website,
    this.imageUrl = this.image(params.bioguide_id)
  };

  name(first_name, last_name){
    return `${first_name} ${last_name}`;
  }

  image(bioguide_id){
    return `https://theunitedstates.io/images/congress/225x275/${bioguide_id}.jpg`;
  }

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
} 


module.exports = Legislator;
