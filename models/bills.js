//nifty constructor for organizing bill info

class Bills {
  constructor(data, bioguide_id) {
    this.bill_id = data.bill_id;
    this.question = data.question;
    this.result = data.result;
    this.url = data.url;
    this.vote_decision = data.voter_ids.bioguide_id
  }
}

module.exports = Bills
