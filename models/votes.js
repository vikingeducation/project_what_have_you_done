class Vote {
  constructor(billID, billURL, billTitle, repVote) {
    this.billID = billID;
    this.billURL = billURL;
    this.billTitle = billTitle;
    this.repVote = repVote;
  }
};

var votes = [
];

module.exports = {
  Vote,
  votes
};
