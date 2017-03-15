class Legislator {
  constructor(leg) {
    this.bioguide_id = leg.bioguide_id;
    this.first_name = leg.first_name;
    this.last_name = leg.last_name;
    this.chamber = leg.chamber;
    this.email = leg.email;
    this.phone = leg.phone;
    this.party = leg.party;
    this.chamber = leg.chamber;
    this.website = leg.website;
  };

  get fullName() {
    return `${this.first_name} ${this.last_name}`;
  }

  get desc() {
    return this.buildDesc();
  }

  get partyLong() {
    if (this.party === 'D') {
      return 'Democrat';
    } else if (this.party === 'R') {
      return 'Republican';
    }
  }

  buildDesc() {
    let desc = '';
    if (this.chamber === 'senate') {
      desc += 'Senate ';
    } else if (this.chamber === 'house') {
      desc += 'House of Representatives ';
    };
    if (this.party === 'D') {
      desc += '(D) ';
    } else if (this.party === 'R') {
      desc += '(R) ';
    };
    return desc;
  };
}

module.exports = Legislator;
