'use strict';

class HouseMember {
  constructor(member) {
    this.name = `${member['first_name']} ${member['last_name']}`;
    this.title = 'Representative';
    this.state = member.state;
    this.district = member.district;
    this.id = member.id;
  }
}

class SenateMember {
  constructor(member) {
    this.name = `${member.first_name} ${member.last_name}`;
    this.title = 'Senator';
    this.state = member.state;
    this.id = member.id;
  }
}

module.exports = {
  HouseMember,
  SenateMember
};
