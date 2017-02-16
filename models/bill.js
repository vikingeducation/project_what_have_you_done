class Bill {
  constructor(legislation) {
    this.id = legislation.bill.bill_id;
    this.title = legislation.bill.official_title;
    this.url = legislation.bill.urls['govtrack'];
    const records = legislation.voter_ids;
    this.voteRecord = records[Object.keys(records)[0]].toLowerCase();
  }
}

module.exports = Bill;
