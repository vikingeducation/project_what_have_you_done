const Bill = require('./bill');
const SunlightCongress = require('../lib/sunlight_congress_wrapper');
const api = new SunlightCongress

class Legislator {
  constructor(attributes = {}) {
    this.id = attributes.id;
    this.name = attributes.name
    this.phone = attributes.phone;
    this.website = attributes.website;
    this.chamber = attributes.chamber;
    this.party = attributes.party;
  }

  bills() {
    api.billsByLegislator(this.id, bills => {
      return bills.map(bill => {
        new Bill(bill.bill_id, bill.official_title, bill.vote)
      });
    });
  }

  static findByZip(zip) {
    api.legislatorsByLocale(zip, legislators => {
      return legislators.map(legislator => {
        return new Legislator({
          id: legislator.bioguide_id,
          name: `${legislator.first_name} ${legislator.last_name}`,
          phone: legislator.phone,
          website: legislator.website,
          chamber: `${legislator.chamber}`,
          party: `${legislator.party}`
        })
      });
    });
  }

  static findById(bioguide_id) {
    api.legislator(bioguide_id, legislator => {
      return new Legislator({
        id: legislator.bioguide_id,
        name: `${legislator.first_name} ${legislator.last_name}`,
        phone: legislator.phone,
        website: legislator.website,
        chamber: `${legislator.chamber}`,
        party: `${legislator.party}`
      })
  });
  }
}
