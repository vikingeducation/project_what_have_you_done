const Bill = require('./bill');
const SunlightCongress = require('../services/sunlight_congress_wrapper');
const api = new SunlightCongress

const photoUrlBase = 'https://theunitedstates.io/images/congress/225x275'

module.exports = class Legislator {
  constructor(attributes = {}) {
    this.id = attributes.id;
    this.name = attributes.name
    this.phone = attributes.phone;
    this.website = attributes.website;
    this.chamber = attributes.chamber;
    this.party = attributes.party;
    this.photo = attributes.photo;
  }


  bills() {
    return api.billsByLegislator(this.id, bills => {
      const newBills = bills.map(bill_container => {
        const bill = bill_container.bill
        const vote = bill_container.voters[this.id].vote;

        if(bill && vote) {
          return new Bill(bill.bill_id, bill.official_title, vote);
        }
      });

      return newBills.filter(bill => bill);
    });
  }

  static get photoUrlBase() {
    return photoUrlBase;
  }

  static photo(bioguide_id) {
    return `${photoUrlBase}/${bioguide_id}.jpg`
  }

  static findByZip(zip) {
    return api.legislatorsByLocale(zip, legislators => {
      return legislators.map(legislator => {
        return new Legislator({
          id: legislator.bioguide_id,
          name: `${legislator.first_name} ${legislator.last_name}`,
          phone: legislator.phone,
          website: legislator.website,
          chamber: `${legislator.chamber}`,
          party: Legislator.partyFullName(legislator.party),
          photo: Legislator.photo(legislator.bioguide_id)
        })
      });
    });
  }

  static findById(bioguide_id) {
    return api.legislator(bioguide_id, legislator => {
      return new Legislator({
        id: legislator.bioguide_id,
        name: `${legislator.first_name} ${legislator.last_name}`,
        phone: legislator.phone,
        website: legislator.website,
        chamber: `${legislator.chamber}`,
        party: Legislator.partyFullName(legislator.party),
        photo: Legislator.photo(legislator.bioguide_id)
      })
    });
  }

  static partyFullName(partyShortName) {
    return partyShortName === 'D' ? 'Democrat' : 'Republican';
  }

  static filterForSenate(legislators) {
    return legislators.filter(legislator => legislator.chamber === "senate");
  }

  static filterForHouse(legislators) {
    return legislators.filter(legislator => legislator.chamber === "house");
  }
}
