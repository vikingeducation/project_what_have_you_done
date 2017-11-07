'use strict';

class houseMember {
  constructor(member) {
    this.name = `${member['first_name']} ${member['last_name']}`;
    this.title = 'Representative';
    this.state = member.state;
    this.district = member.district;
    this.id = member.id;
  }
}

class senateMember {
  constructor(member) {
    this.name = `${member.first_name} ${member.last_name}`;
    this.title = 'Senator';
    this.state = member.state;
    this.district = member.district;
    this.id = member.id;
  }
}

module.exports = {
  houseMember,
  senateMember
};
