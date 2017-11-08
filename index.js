'use strict';

class HouseMember {
  constructor(member) {
    this.name = `${member['first_name']} ${member['last_name']}`;
    this.title = 'Representative';
    this.state = member.state;
    this.district = member.district;
    this.id = member.id;
    this.party = member.party;
    this.phone = member.phone;
    this.website = member.url;
  }
}

class SenateMember {
  constructor(member) {
    this.name = `${member.first_name} ${member.last_name}`;
    this.title = 'Senator';
    this.state = member.state;
    this.id = member.id;
    this.party = member.party;
    this.phone = member.phone;
    this.website = member.url;
  }
}

class Votes {
  constructor(data) {
    this.bills = {};
    for (let key in data) {
      const obj = data[key];
      const entry = {
      this.title = obj.bill.title,
      this.bill_id = obj.bill.bill_id,
      this.description = obj.description,
      this.position = obj.position,
      this.result = obj.result
    };
    this.bills[key] = entry;
    }
  }
}

module.exports = {
  HouseMember,
  SenateMember,
  Votes
};
