'use strict';

class HouseMember {
  constructor(member) {
    if (member.current_party === 'D') {
      this.party = 'Democratic';
    } else {
      this.party = 'Republican';
    }
    this.name = `${member['first_name']} ${member['last_name']}`;
    this.title = 'Representative';
    this.state = member.roles[0].state;
    this.district = member.roles[0].district;
    this.id = member.member_id;
    this.phone = member.roles[0].phone;
    this.website = `https://${member.url}`;
    this.photo = `/images/${member.member_id}.jpg`;
    this.soloUrl = `/legislators/id/${member.member_id}`;
  }
}

class SenateMember {
  constructor(member) {
    if (member.current_party === 'D') {
      this.party = 'Democratic';
    } else {
      this.party = 'Republican';
    }
    this.name = `${member.first_name} ${member.last_name}`;
    this.title = 'Senator';
    this.state = member.roles[0].state;
    this.id = member.member_id;
    this.phone = member.roles[0].phone;
    this.website = `https://${member.url}`;
    this.photo = `/images/${member.member_id}.jpg`;
    this.soloUrl = `/legislators/id/${member.member_id}`;
  }
}

class Votes {
  constructor(data) {
    const billNum = data.bill.number.toLowerCase().replace(/\s/g, '');
    const newNum = billNum.slice(0, 2) !== 'pn' ? billNum : null;
    const result = data.result === 'Passed' ? data.result : null;
    this.num = newNum;
    this.title = data.bill.title;
    this.bill_id = data.bill.bill_id;
    this.bill_url = `https://www.govtrack.us/congress/bills/115/${newNum}`;
    this.description = data.description;
    this.position = data.position;
    this.result = result;
  }
}

module.exports = {
  HouseMember,
  SenateMember,
  Votes
};
