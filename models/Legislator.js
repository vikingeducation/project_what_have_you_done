class Legislator {
  constructor(leg) {
    this.bioguide_id = leg.bioguide_id;
    this.chamber = leg.chamber;
    this.first_name = leg.first_name;
    this.last_name = leg.last_name;
    this.party = leg.party;
    this.website = leg.website;
    this.email = leg.oc_email;
    this.phone = leg.phone
  }

  get partyFull() {
    switch (this.party) {
      case 'D':
        return 'Democrat';
        break;
      case 'R':
        return 'Republican';
        break;
      case 'I':
        return 'Independent';
        break;
    }
  }
}

module.exports = Legislator;