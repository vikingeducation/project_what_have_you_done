class Legislator {

  constructor(params) {
    this.bioguide_id = params.bioguide_id,
    this.name = this.name(params.first_name, params.last_name),
    this.chamber = params.chamber,
    this.party = this.partyConverter(params.party),
    this.phone = params.phone,
    this.website = params.website,
    this.imageUrl = this.image(params.bioguide_id),
    this.title = this.createTitle(this.chamber, params.party)
  };

  name(first_name, last_name){
    return `${first_name} ${last_name}`;
  }

  image(bioguide_id){
    return `https://theunitedstates.io/images/congress/225x275/${bioguide_id}.jpg`;
  }

  createTitle(chamber, apiParty){
    var strChamber;
    if (chamber==='senate') {
      strChamber = ' Senator';
    } else {
      strChamber = ' Congressperson';
    }

    switch (apiParty) {
      case 'D':
        return 'Democratic' + strChamber
        break;
      case 'R':
        return 'Republican' + strChamber
        break;
      case 'I':
        return 'Independent' + strChamber
        break;  
    }
  }

  partyConverter(apiParty){
    switch (apiParty) {
      case 'D':
        return 'Democrat'
        break;
      case 'R':
        return 'Republican'
        break;
      default:
        return 'Independent'
    }
  };
} 


module.exports = Legislator;
