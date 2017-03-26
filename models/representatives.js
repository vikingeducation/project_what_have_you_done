class Representative {
  constructor(id, name, chamber, party, phone, website) {
    this.id = id;
    this.name = name;
    this.chamber = chamber;
    this.party = party;
    this.phone = phone;
    this.website = website;
  }
};

var representatives = [
];

module.exports = {
  Representative,
  representatives
};
