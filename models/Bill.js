class Bill {
  constructor(leg) {
    this.bill_id = leg.bill.bill_id;
    this.title = leg.bill.official_title;
    this.url = leg.bill.urls.govtrack;
    this.votes = leg.voter_ids;
    this.vote = this.votes[Object.keys(this.votes)[0]].toLowerCase();
  }
}

module.exports = Bill;