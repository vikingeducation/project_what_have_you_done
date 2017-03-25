
class Legislator {
  constructor(leg){
    this.bioguide_id = leg.bioguide_id;
    this.chamber = leg.chamber;
    this.first_name = leg.first_name;
    this.last_name = leg.last_name;
    this.party = leg.party;
    this.website = leg.website;
    this.email = leg.oc_email;
    this.phone = leg.phone;
  }

  get fullName(){
    return (this.first_name + ' ' + this.last_name);
  }

  get photo(){
    return "https://theunitedstates.io/images/congress/original/" + this.bioguide_id + ".jpg"
  }

  get partyLong(){
    switch(this.party){
      case 'R':
        return 'Republican';
        break;
      case 'D':
        return 'Democrat';
        break;
      case 'I':
        return 'Independent';
        break;
      case 'A':
        return 'Anarchist';
        break;
    }
  }


}

module.exports = Legislator;